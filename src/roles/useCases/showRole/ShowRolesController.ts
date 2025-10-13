import { type Request, type Response } from "express";
import type { ShowRolesUseCase } from "./ShowRolesUseCase.js";

export class ShowRolesController {
    constructor(private showRolesUseCase: ShowRolesUseCase) { }

    async handle(request: Request, response: Response): Promise<Response | null> {
        const { id } = request.params
        const roles = await this.showRolesUseCase.execute({ id })
        return response.json(roles)
    }
}
