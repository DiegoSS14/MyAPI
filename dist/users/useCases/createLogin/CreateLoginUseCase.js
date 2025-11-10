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
import { compare } from "bcryptjs";
import pkg from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../config/auth.js";
import { AppError } from "../../../shared/error/AppError.js";
import { RefreshTokenRepository } from "../../repositories/RefreshTokenRepository.js";
import { UsersRepository } from "../../repositories/UsersRepository.js";
const { sign } = pkg;
let CreateLoginUseCase = class CreateLoginUseCase {
    constructor(userRepository, refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async execute({ email, password }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError('Email or password incorrect', 401);
        }
        const passwordConfirmed = await compare(password, user.password);
        if (!passwordConfirmed) {
            throw new AppError('Email or password incorrect', 401);
        }
        const acessToken = sign({}, auth.jwt.secret, {
            subject: String(user.id),
            expiresIn: auth.jwt.expiresIn
        });
        const expires = new Date(Date.now() + auth.refreshToken.duration);
        const refreshToken = sign({}, auth.refreshToken.secret, {
            subject: String(user.id),
            expiresIn: auth.refreshToken.expiresIn
        });
        await this.refreshTokenRepository.create({
            user_id: user.id,
            token: refreshToken,
            valid: true,
            expires: expires
        });
        return {
            user,
            acessToken,
            refreshToken
        };
    }
};
CreateLoginUseCase = __decorate([
    injectable(),
    __param(0, inject('UsersRepository')),
    __param(1, inject('RefreshTokenRepository')),
    __metadata("design:paramtypes", [UsersRepository,
        RefreshTokenRepository])
], CreateLoginUseCase);
export { CreateLoginUseCase };
