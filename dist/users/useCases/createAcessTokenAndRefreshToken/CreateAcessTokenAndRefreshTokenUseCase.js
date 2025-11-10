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
import { AppError } from "../../../shared/error/AppError.js";
import jwtConfig from '../../../config/auth.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;
let CreateAcessTokenAndRefreshTokenUseCase = class CreateAcessTokenAndRefreshTokenUseCase {
    constructor(userRepository, refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    async execute({ user_id, refresh_token }) {
        const user = await this.userRepository.findById(user_id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        const refreshTokenExists = await this.refreshTokenRepository.findByToken(refresh_token);
        if (!refreshTokenExists) {
            throw new AppError('Refresh token is required', 401);
        }
        const dateNow = new Date().getTime();
        if (!refreshTokenExists.valid || refreshTokenExists.expires.getTime() < dateNow) {
            throw new AppError('Refresh token is invalid/expired', 401);
        }
        await this.refreshTokenRepository.invalidate(refreshTokenExists);
        const acessToken = sign({}, jwtConfig.jwt.secret, {
            subject: user.id,
            expiresIn: jwtConfig.jwt.expiresIn
        });
        const expires = new Date(Date.now() + jwtConfig.refreshToken.duration);
        const refreshToken = sign({}, jwtConfig.refreshToken.secret, {
            subject: user.id,
            expiresIn: jwtConfig.refreshToken.expiresIn
        });
        await this.refreshTokenRepository.create({
            user_id: user.id,
            expires: expires,
            valid: true,
            token: refreshToken
        });
        return {
            user,
            acessToken,
            refreshToken
        };
    }
};
CreateAcessTokenAndRefreshTokenUseCase = __decorate([
    injectable(),
    __param(0, inject('UsersRepository')),
    __param(1, inject('RefreshTokenRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateAcessTokenAndRefreshTokenUseCase);
export { CreateAcessTokenAndRefreshTokenUseCase };
