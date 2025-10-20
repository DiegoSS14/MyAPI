import { type Request, type Response } from "express";
import { ListRolesUseCase } from "./ListRolesUseCase.js";
import { container } from "tsyringe";

export class ListRolesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listRolesUseCase = container.resolve(ListRolesUseCase)
        const page = request.query.page && Number(request.query.page) > 0 ? Number(request.query.page) : 1
        const limit = request.query.limit && Number(request.query.limit) ? Number(request.query.limit) : 15

        const roles = await listRolesUseCase.execute({ page, limit })
        return response.json(roles)
    }
}
