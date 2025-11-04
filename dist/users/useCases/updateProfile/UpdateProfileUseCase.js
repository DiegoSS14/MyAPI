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
import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../repositories/UsersRepository.js";
import { AppError } from "../../../shared/error/AppError.js";
import { compare, hash } from "bcryptjs";
let UpdateProfileUseCase = class UpdateProfileUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ userId, name, email, password, old_password }) {
        const user = await this.usersRepository.findByEmail(email);
        if (user && user.id !== userId) {
            throw new AppError('Email already in use');
        }
        if (password && old_password) {
            const compareOldPassword = await compare(old_password, user.password);
            if (!compareOldPassword) {
                throw new AppError('Old password does not match', 400);
            }
            user.password = await hash(password, 10);
        }
        user.name = name;
        user.email = email;
        return await this.usersRepository.save(user);
    }
};
UpdateProfileUseCase = __decorate([
    injectable(),
    __param(0, inject('UsersRepository')),
    __metadata("design:paramtypes", [UsersRepository])
], UpdateProfileUseCase);
export { UpdateProfileUseCase };
