export class CreateRoleController {
    constructor(createRolesUseCase) {
        this.createRolesUseCase = createRolesUseCase;
    }
    async handle(request, response) {
        const { name } = request.body;
        const role = await this.createRolesUseCase.execute({ name });
        return response.status(201).json(role);
    }
}
