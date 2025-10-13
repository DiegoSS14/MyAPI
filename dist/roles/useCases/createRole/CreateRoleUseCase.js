import { AppError } from "../../../shared/error/AppError.js";
export class CreateRoleUseCase {
    constructor(rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    async execute({ name }) {
        const roleAlreadyExists = await this.rolesRepository.findByName(name);
        if (roleAlreadyExists) {
            throw new AppError('Name already exists');
        }
        return this.rolesRepository.create({ name });
    }
}
