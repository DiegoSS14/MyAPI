export class DeleteRolesController {
    constructor(deleteRolesUseCase) {
        this.deleteRolesUseCase = deleteRolesUseCase;
    }
    async handle(request, response) {
        const { id } = request.params;
        const roles = await this.deleteRolesUseCase.execute({ id });
        return response.status(204).send();
    }
}
