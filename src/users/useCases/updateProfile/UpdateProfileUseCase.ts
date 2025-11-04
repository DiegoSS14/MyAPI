import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../../repositories/UsersRepository.js";
import { AppError } from "../../../shared/error/AppError.js";
import { compare, hash } from "bcryptjs";
import { User } from "../../entities/User.js";

type UpdateProfileDTO = {
    userId: string
    name: string
    email: string,
    password?: string,
    old_password?: string
}

@injectable()
export class UpdateProfileUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: UsersRepository
    ) { }

    async execute({ userId, name, email, password, old_password }: UpdateProfileDTO): Promise<User> {
        const user = await this.usersRepository.findByEmail(email)
        if (user && user.id !== userId) {
            throw new AppError('Email already in use')
        }
        if(password && old_password) {
            const compareOldPassword = await compare(old_password, user!.password)
            if(!compareOldPassword) {
                throw new AppError('Old password does not match', 400)
            }
            user!.password = await hash(password, 10)
        }
        user!.name = name
        user!.email = email

        return await this.usersRepository.save(user!)
    }
}
