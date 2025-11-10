import { RefreshToken } from "../entities/RefreshToken.js";

export type RefreshTokenDTO = {
    user_id: string
    token: string
    valid: boolean
    expires: Date
}

export interface IRefreshTokenRepository {
    create({user_id, token, valid, expires}: RefreshTokenDTO): Promise<RefreshToken>
    findByToken(token: string): Promise<RefreshToken | null>
    invalidate(refresh_token: RefreshToken): Promise<void>
}
