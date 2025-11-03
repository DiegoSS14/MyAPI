import { inject, injectable } from "tsyringe";
import IUsersRepository from "../../repositories/IUsersRepository.js";
import { User } from "../../entities/User.js";
import uploadConfig from "../../../config/upload.js"
import { AppError } from "../../../shared/error/AppError.js";
import path from "path";
import fs from "fs";

type UpdateAvatarDTO = {
    userId: string
    avatarFileName: string
}

@injectable()
export class UpdateAvatarUsecase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({userId, avatarFileName}: UpdateAvatarDTO): Promise<User> {
        const user = await this.usersRepository.findById(userId)
        if(!user) {
            throw new AppError("Only authenticated users can change avatar", 401)
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFileName

        return await this.usersRepository.save(user)
    }
}
