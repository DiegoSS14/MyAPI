import { container } from "tsyringe";
import { CreateAcessTokenAndRefreshTokenUseCase } from "./CreateAcessTokenAndRefreshTokenUseCase.js";
import { instanceToInstance } from "class-transformer";
export class CreateAcessTokenAndRefreshTokenController {
    async handle(request, response) {
        const createAcessTokenAndRefreshToken = container.resolve(CreateAcessTokenAndRefreshTokenUseCase);
        const user_id = request.user.id;
        const { refresh_token } = request.body;
        const { user, acessToken, refreshToken } = await createAcessTokenAndRefreshToken.execute({
            user_id, refresh_token
        });
        return response.status(201).json(instanceToInstance({
            user,
            acessToken,
            refreshToken
        }));
    }
}
