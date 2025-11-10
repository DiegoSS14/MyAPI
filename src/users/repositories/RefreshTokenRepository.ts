import { Repository } from "typeorm";
import { RefreshToken } from "../entities/RefreshToken.js";
import { dataSource } from "../../shared/typeorm/index.js";
import { IRefreshTokenRepository, RefreshTokenDTO } from "./IRefreshTokenRepository.js";
import { AppError } from "../../shared/error/AppError.js";
import { ref } from "process";

export class RefreshTokenRepository implements IRefreshTokenRepository {

    private repository: Repository<RefreshToken>

    constructor() {
        this.repository = dataSource.getRepository(RefreshToken)
    }

    async create({ user_id, token, valid, expires }: RefreshTokenDTO): Promise<RefreshToken> {
        const refreshToken = await this.repository.create({
            user_id, token, valid, expires
        })
        return this.repository.save(refreshToken)
    }
    async findByToken(token: string): Promise<RefreshToken | null> {
        return this.repository.findOneBy({ token })
    }
    async invalidate(refresh_token: RefreshToken): Promise<void> {
        const refreshToken = await this.repository.findOneBy({ token: refresh_token.token })
        if (!refreshToken) {
            throw new AppError("Refresh token not found", 404)
        }
        refreshToken.valid = false
        await this.repository.save(refreshToken)
    }
}
