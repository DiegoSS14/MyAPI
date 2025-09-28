import type { Role } from "../../entities/Role.js";
import type { RolesRepository } from "../../repositories/RolesRepository.js";

export class ListRolesUseCase{
    constructor(private rolesRepository: RolesRepository) {}

    execute(): Role[] {
        return this.rolesRepository.findAll()
    }
}
