import { Role } from "../../entities/Role.js"
import type { RolesRepository } from "../../repositories/RolesRepository.js"

type ShowRolesUseCaseParams = {
    id: string
}

export class ShowRolesUseCase {
    constructor(private rolesRepository: RolesRepository) { }

    async execute({ id }: ShowRolesUseCaseParams): Promise<Role | null> {
        return await this.rolesRepository.findById( id )
    }
}
