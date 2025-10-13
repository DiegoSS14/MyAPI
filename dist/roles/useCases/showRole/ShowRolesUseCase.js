export class ShowRolesUseCase {
    constructor(rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    async execute({ id }) {
        return await this.rolesRepository.findById(id);
    }
}
