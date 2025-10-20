import { DeleteRolesUseCase } from "./DeleteRolesUseCase.js";
import { container } from "tsyringe";
export class DeleteRolesController {
    async handle(request, response) {
        const deleteRolesUseCase = container.resolve(DeleteRolesUseCase);
        const { id } = request.params;
        await deleteRolesUseCase.execute({ id });
        return response.status(204).send();
    }
}
