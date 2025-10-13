import { type Request, type Response } from "express";
import type { ListRolesUseCase } from "./ListRolesUseCase.js";

export class ListRolesController {
    constructor(private listRolesUseCase: ListRolesUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const page = request.query.page && Number(request.query.page) > 0 ? Number(request.query.page) : 1
        const limit = request.query.limit && Number(request.query.limit) ? Number(request.query.limit) : 15

        const roles = await this.listRolesUseCase.execute({ page, limit })
        return response.json(roles)
    }
}
