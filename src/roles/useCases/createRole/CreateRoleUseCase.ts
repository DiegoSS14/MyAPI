import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error/AppError.js";
import { Role } from "../../entities/Role.js";
import type { RolesRepository } from "../../repositories/RolesRepository.js";

type CreateRoleDTO = {
    name: string
}

@injectable()
export class CreateRoleUseCase {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: RolesRepository
    ) {}

    async execute({ name }: CreateRoleDTO): Promise<Role> {
        const roleAlreadyExists = await this.rolesRepository.findByName(name)

        if (roleAlreadyExists) {
            throw new AppError('Name already exists')
        }

        return this.rolesRepository.create({ name })
    }
}
