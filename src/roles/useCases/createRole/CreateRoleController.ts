import type { Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase.js";

export class CreateRoleController {
    constructor(private createRolesUseCase: CreateRoleUseCase) { }

    handle(request: Request, response: Response) {
        const { name } = request.body
        const role = this.createRolesUseCase.execute({ name })

        return response.status(201).json(role)
    }
}
