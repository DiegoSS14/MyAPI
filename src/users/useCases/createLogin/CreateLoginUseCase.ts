import { compare } from "bcryptjs";
import pkg, { Secret } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../config/auth.js";
import { AppError } from "../../../shared/error/AppError.js";
import { User } from "../../entities/User.js";
import { RefreshTokenRepository } from "../../repositories/RefreshTokenRepository.js";
import { UsersRepository } from "../../repositories/UsersRepository.js";
const { sign } = pkg as any;

export type CreateLoginDTO = {
    email: string
    password: string
}

export type IResponse = {
    user: User
    acessToken: string
    refreshToken: string
}

@injectable()
export class CreateLoginUseCase {

    constructor(
        @inject('UsersRepository')
        private userRepository: UsersRepository,
        @inject('RefreshTokenRepository')
        private refreshTokenRepository: RefreshTokenRepository
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

        const acessToken = sign({}, auth.jwt.secret as Secret, {
            subject: String(user.id),
            expiresIn: auth.jwt.expiresIn
        } as any)

        const expires = new Date(Date.now() + auth.refreshToken.duration)

        const refreshToken = sign({}, auth.refreshToken.secret as Secret, {
            subject: String(user.id),
            expiresIn: auth.refreshToken.expiresIn
        })

            await this.refreshTokenRepository.create({
                user_id: user.id!,
                token: refreshToken,
                valid: true,
                expires: expires
            })


        return {
            user,
            acessToken,
            refreshToken
        }
    }
}
