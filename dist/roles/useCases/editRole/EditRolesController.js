import { EditRolesUseCase } from "./EditRolesUseCase.js";
import { container } from 'tsyringe';
export class EditRolesController {
    async handle(request, response) {
        const editRoleUseCase = container.resolve(EditRolesUseCase);
        const { id } = request.params;
        const { name } = request.body;
        const roles = await editRoleUseCase.execute({ id, name });
        return response.json(roles);
    }
}
