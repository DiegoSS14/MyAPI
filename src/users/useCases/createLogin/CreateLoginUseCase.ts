import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import auth from "../../../config/auth.js";
import pkg from "jsonwebtoken";
const { sign } = pkg as any;
import { AppError } from "../../../shared/error/AppError.js";
import { User } from "../../entities/User.js";
import { UsersRepository } from "../../repositories/UsersRepository.js";

export type CreateLoginDTO = {
    email: string
    password: string
}

export type IResponse = {
    user: User
    token: string
}

@injectable()
export class CreateLoginUseCase {

    constructor(
        @inject('UsersRepository')
        private userRepository: UsersRepository
    ) { }

    async execute({ email, password }: CreateLoginDTO): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email)
        if (!user) {
            throw new AppError('Email or password incorrect', 401)
        }
        const passwordConfirmed = await compare(password, user.password)
        if (!passwordConfirmed) {
            throw new AppError('Email or password incorrect', 401)
        }


        const token = sign({}, auth.jwt.secret as any, {
            subject: String(user.id),
            expiresIn: auth.jwt.expiresIn
        } as any)

        return {
            user: user,
            token: token
        }
    }
}
