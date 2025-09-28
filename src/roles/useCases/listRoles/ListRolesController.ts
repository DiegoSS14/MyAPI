import { type Request, type Response } from "express";
import type { ListRolesUseCase } from "./ListRolesUseCase.js";

export class ListRolesController{
    constructor(private listRolesUseCase: ListRolesUseCase) {}

    handle(request: Request, response: Response): Response {
        const roles = this.listRolesUseCase.execute()
        return response.status(200).json(roles)
    }
}
