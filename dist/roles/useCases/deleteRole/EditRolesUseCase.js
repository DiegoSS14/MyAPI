import { AppError } from "../../../shared/error/AppError.js";
export class EditRolesUseCase {
    constructor(rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    async execute({ id }) {
        const role = await this.rolesRepository.findById(id);
        if (!role) {
            throw new AppError('Role not found');
        }
        await this.rolesRepository.delete(role);
    }
}
