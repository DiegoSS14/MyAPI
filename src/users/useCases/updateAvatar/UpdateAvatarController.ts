import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUsecase } from "./updateAvatarUsecase.js";
import { instanceToInstance } from "class-transformer";

export class UpdateAvatarController {

    async handle(request: Request, response: Response) {
        const updateAvatarUseCase = container.resolve(UpdateAvatarUsecase)

        const user = await updateAvatarUseCase.execute({
            userId: request.body.userId,
            avatarFileName: request.file!.filename
        })

        return response.json(instanceToInstance(user))
    }
}
