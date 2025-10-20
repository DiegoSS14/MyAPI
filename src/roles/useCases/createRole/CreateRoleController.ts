import type { Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase.js";
import { container } from "tsyringe";

export class CreateRoleController {

    async handle(request: Request, response: Response): Promise<Response> {
        const createRolesUseCase = container.resolve(CreateRoleUseCase)
        const { name } = request.body
        const role = await createRolesUseCase.execute({ name })

        return response.status(201).json(role)
    }
}
