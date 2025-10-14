export class EditRolesController {
    constructor(showRolesUseCase) {
        this.showRolesUseCase = showRolesUseCase;
    }
    async handle(request, response) {
        const { id } = request.params;
        const { name } = request.body;
        const roles = await this.showRolesUseCase.execute({ id, name });
        return response.json(roles);
    }
}
