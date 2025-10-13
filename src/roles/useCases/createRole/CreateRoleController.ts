import type { Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase.js";

export class CreateRoleController {
    constructor(private createRolesUseCase: CreateRoleUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body
        const role = await this.createRolesUseCase.execute({ name })

        return response.status(201).json(role)
    }
}
