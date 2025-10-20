import { CreateRoleUseCase } from "./CreateRoleUseCase.js";
import { container } from "tsyringe";
export class CreateRoleController {
    async handle(request, response) {
        const createRolesUseCase = container.resolve(CreateRoleUseCase);
        const { name } = request.body;
        const role = await createRolesUseCase.execute({ name });
        return response.status(201).json(role);
    }
}
