import { inject, injectable } from "tsyringe"
import { Role } from "../../entities/Role.js"
import type { RolesRepository } from "../../repositories/RolesRepository.js"

type ShowRoleUseCaseParams = {
    id: string
}

@injectable()
export class ShowRolesUseCase {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: RolesRepository
    ) { }

    async execute({ id }: ShowRoleUseCaseParams): Promise<Role | null> {
        return await this.rolesRepository.findById(id)
    }
}
