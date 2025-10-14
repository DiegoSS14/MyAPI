import { AppError } from "../../../shared/error/AppError.js";
export class EditRolesUseCase {
    constructor(rolesRepository) {
        this.rolesRepository = rolesRepository;
    }
    async execute({ id, name }) {
        const role = await this.rolesRepository.findById(id);
        if (!role) {
            throw new AppError('Role not found', 404);
        }
        const roleWithSameName = await this.rolesRepository.findByName(name);
        if (roleWithSameName && roleWithSameName.name !== name) {
            throw new AppError('Role name not informed or already in use');
        }
        role.name = name;
        return this.rolesRepository.save(role);
    }
}
