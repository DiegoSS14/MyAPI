export class ShowRolesUseCase {
    constructor(rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    async execute({ page, limit }) {
        const take = limit;
        const skip = (Number(page) - 1) * take;
        return this.rolesRepository.findAll({ page, skip, take });
    }
}
