import type { RolesRepository } from "../../repositories/RolesRepository.js"
import { type RolesPaginateProperties} from "../../repositories/RolesRepository.js"

type ListRolesUseCaseParams = {
    page: number
    limit: number
}

export class ListRolesUseCase {
    constructor(private rolesRepository: RolesRepository) { }

    async execute({ page, limit }: ListRolesUseCaseParams): Promise<RolesPaginateProperties> {
        const take = limit
        const skip = (Number(page) - 1) * take
        return this.rolesRepository.findAll({ page, skip, take })
    }
}
