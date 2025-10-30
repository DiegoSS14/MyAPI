var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { RolesRepository } from "../../../roles/repositories/RolesRepository.js";
import { AppError } from "../../../shared/error/AppError.js";
import { UsersRepository } from "../../repositories/UsersRepository.js";
let CreateUserUseCase = class CreateUserUseCase {
    constructor(rolesRepository, userRepository) {
        this.rolesRepository = rolesRepository;
        this.userRepository = userRepository;
    }
    async execute({ name, email, password, isAdmin, roleId }) {
        const emailExists = await this.userRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email address already used');
        }
        const role = await this.rolesRepository.findById(roleId);
        if (!role) {
            throw new AppError('Role not found', 404);
        }
        const passwordHashed = await hash(password, 10);
        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHashed,
            isAdmin,
            role
        });
        return user;
    }
};
CreateUserUseCase = __decorate([
    injectable(),
    __param(0, inject('RolesRepository')),
    __param(1, inject('UsersRepository')),
    __metadata("design:paramtypes", [RolesRepository,
        UsersRepository])
], CreateUserUseCase);
export { CreateUserUseCase };
