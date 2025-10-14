import { type Request, type Response } from "express";
import type { EditRolesUseCase } from "./EditRolesUseCase.js";

export class EditRolesController {
    constructor(private showRolesUseCase: EditRolesUseCase) { }

    async handle(request: Request, response: Response): Promise<Response | null> {
        const { id } = request.params
        const { name } = request.body
        const roles = await this.showRolesUseCase.execute({ id, name })
        return response.json(roles)
    }
}
