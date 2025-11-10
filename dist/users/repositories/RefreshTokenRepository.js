import { RefreshToken } from "../entities/RefreshToken.js";
import { dataSource } from "../../shared/typeorm/index.js";
import { AppError } from "../../shared/error/AppError.js";
export class RefreshTokenRepository {
    constructor() {
        this.repository = dataSource.getRepository(RefreshToken);
    }
    async create({ user_id, token, valid, expires }) {
        const refreshToken = await this.repository.create({
            user_id, token, valid, expires
        });
        return this.repository.save(refreshToken);
    }
    async findByToken(token) {
        return this.repository.findOneBy({ token });
    }
    async invalidate(refresh_token) {
        const refreshToken = await this.repository.findOneBy({ token: refresh_token.token });
        if (!refreshToken) {
            throw new AppError("Refresh token not found", 404);
        }
        refreshToken.valid = false;
        await this.repository.save(refreshToken);
    }
}
