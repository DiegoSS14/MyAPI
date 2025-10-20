import { ShowRolesUseCase } from "./ShowRolesUseCase.js";
import { container } from "tsyringe";
export class ShowRolesController {
    async handle(request, response) {
        const showRoleUseCase = container.resolve(ShowRolesUseCase);
        const { id } = request.params;
        const roles = await showRoleUseCase.execute({ id });
        return response.json(roles);
    }
}
