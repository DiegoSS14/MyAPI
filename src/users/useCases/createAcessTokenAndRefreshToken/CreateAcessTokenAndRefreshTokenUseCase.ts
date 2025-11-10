import { inject, injectable } from "tsyringe"
import IUsersRepository from "../../repositories/IUsersRepository.js"
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository.js";
import { IResponse } from "../createLogin/CreateLoginUseCase.js"
import { AppError } from "../../../shared/error/AppError.js"
import jwtConfig from '../../../config/auth.js'
import { Secret } from "jsonwebtoken"
import pkg from 'jsonwebtoken'
const { sign } = pkg

type CreateAcessTokenAndRefreshTokenDTO = {
    user_id: string
    refresh_token: string
}

@injectable()
export class CreateAcessTokenAndRefreshTokenUseCase {

    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,
        @inject('RefreshTokenRepository')
        private refreshTokenRepository: IRefreshTokenRepository
    ) { }

    public async execute({user_id, refresh_token}: CreateAcessTokenAndRefreshTokenDTO): Promise<IResponse>  {
        const user = await this.userRepository.findById(user_id)
        if(!user) {
            throw new AppError('User not found', 404)
        }

        const refreshTokenExists = await this.refreshTokenRepository.findByToken(refresh_token)
        if(!refreshTokenExists) {
            throw new AppError('Refresh token is required', 401)
        }

        const dateNow = new Date().getTime()

        if(!refreshTokenExists.valid || refreshTokenExists.expires.getTime() < dateNow) {
            throw new AppError('Refresh token is invalid/expired', 401)
        }

        await this.refreshTokenRepository.invalidate(refreshTokenExists)

        const acessToken = sign({}, jwtConfig.jwt.secret as Secret, {
            subject: user.id,
            expiresIn: jwtConfig.jwt.expiresIn
        } as any)

        const expires = new Date(Date.now() + jwtConfig.refreshToken.duration)
        const refreshToken = sign({}, jwtConfig.refreshToken.secret as Secret, {
            subject: user.id,
            expiresIn: jwtConfig.refreshToken.expiresIn
        } as any)

        await this.refreshTokenRepository.create({
            user_id: user.id!,
            expires: expires,
            valid: true,
            token: refreshToken
        })

        return {
            user,
            acessToken,
            refreshToken
        } as IResponse
    }
}
