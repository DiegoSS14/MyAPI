import type { RolesRepository } from "../../repositories/RolesRepository.js"
import { RolesPaginateProperties } from "../../repositories/IRolesRepository.js"
import { inject, injectable } from "tsyringe"

type ListRolesUseCaseParams = {
    page: number
    limit: number
}

@injectable()
export class ListRolesUseCase {
    constructor(
        @inject('RolesRepository')
        private rolesRepository: RolesRepository
    ) { }

    async execute({ page, limit }: ListRolesUseCaseParams): Promise<RolesPaginateProperties> {
        const take = limit
        const skip = (Number(page) - 1) * take
        return this.rolesRepository.findAll({ page, skip, take })
    }
}
