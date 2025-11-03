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
import uploadConfig from "../../../config/upload.js";
import { AppError } from "../../../shared/error/AppError.js";
import path from "path";
import fs from "fs";
let UpdateAvatarUsecase = class UpdateAvatarUsecase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ userId, avatarFileName }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new AppError("Only authenticated users can change avatar", 401);
        }
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFileName;
        return await this.usersRepository.save(user);
    }
};
UpdateAvatarUsecase = __decorate([
    injectable(),
    __param(0, inject("UsersRepository")),
    __metadata("design:paramtypes", [Object])
], UpdateAvatarUsecase);
export { UpdateAvatarUsecase };
