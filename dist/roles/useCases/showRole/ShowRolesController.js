export class ShowRolesController {
    constructor(showRolesUseCase) {
        this.showRolesUseCase = showRolesUseCase;
    }
    async handle(request, response) {
        const { id } = request.params;
        const roles = await this.showRolesUseCase.execute({ id });
        return response.json(roles);
    }
}
