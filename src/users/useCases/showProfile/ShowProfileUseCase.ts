import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error/AppError.js";
import { User } from "../../entities/User.js";
import { UsersRepository } from "../../repositories/UsersRepository.js";

export type ShowUserParams = {
    userId: string
}

@injectable()
export class ShowProfileUseCase {

    constructor(
        @inject('UsersRepository')
        private userRepository: UsersRepository
    ) { }

    async execute({ userId }: ShowUserParams): Promise<User> {
        const user = await this.userRepository.findById(userId)
        if (!user) {
            throw new AppError('User not found', 404)
        }

        return user
    }
}
