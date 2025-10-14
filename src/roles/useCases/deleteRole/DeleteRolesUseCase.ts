import { AppError } from "../../../shared/error/AppError.js"
import type { RolesRepository } from "../../repositories/RolesRepository.js"

type DeleteRolesUseCaseProps = {
    id: string
}

export class DeleteRolesUseCase {
    constructor(private rolesRepository: RolesRepository) { }

    async execute({ id }: DeleteRolesUseCaseProps): Promise<void> {
        const role = await this.rolesRepository.findById(id)
        if(!role) {
            throw new AppError('Role not found')
        }
        await this.rolesRepository.delete(role)
    }
}
