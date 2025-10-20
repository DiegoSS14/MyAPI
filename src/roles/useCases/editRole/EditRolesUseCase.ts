import { inject, injectable } from "tsyringe"
import { AppError } from "../../../shared/error/AppError.js"
import { Role } from "../../entities/Role.js"
import type { RolesRepository } from "../../repositories/RolesRepository.js"

type EditRolesUseCaseDTO = {
    id: string
    name: string
}

@injectable()
export class EditRolesUseCase {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: RolesRepository
    ) { }

    async execute({ id, name }: EditRolesUseCaseDTO): Promise<Role | null> {
        const role = await this.rolesRepository.findById(id)
        if (!role) {
            throw new AppError('Role not found', 404)
        }
        const roleWithSameName = await this.rolesRepository.findByName(name)
        if (roleWithSameName && roleWithSameName.name !== name) {
            throw new AppError('Role name not informed or already in use')
        }

        role.name = name
        return this.rolesRepository.save(role)
    }
}
