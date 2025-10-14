import { type Request, type Response } from "express";
import { DeleteRolesUseCase } from "./DeleteRolesUseCase.js";

export class DeleteRolesController {
    constructor(private deleteRolesUseCase: DeleteRolesUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const roles = await this.deleteRolesUseCase.execute({ id })
        return response.status(204).send()
    }
}
