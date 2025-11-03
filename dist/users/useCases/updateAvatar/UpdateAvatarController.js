import { container } from "tsyringe";
import { UpdateAvatarUsecase } from "./updateAvatarUsecase.js";
import { instanceToInstance } from "class-transformer";
export class UpdateAvatarController {
    async handle(request, response) {
        const updateAvatarUseCase = container.resolve(UpdateAvatarUsecase);
        const user = await updateAvatarUseCase.execute({
            userId: request.body.userId,
            avatarFileName: request.file.filename
        });
        return response.json(instanceToInstance(user));
    }
}
