import { Role } from "../entities/Role.js"

export type RoleDTO = {
    name: string
}

export type PaginateParams = {
    page: number
    skip: number
    take: number
}

export type RolesPaginateProperties = {
    per_page: number
    total: number
    current_page: number
    data: Role[]
}

export interface IRolesRepository {
    findAll({page, skip, take}: PaginateParams): Promise<RolesPaginateProperties>
    findByName(name: string): Promise<Role | null>
    findById(id: string): Promise<Role | null>
    create({ name }: RoleDTO): Promise<Role>
    save(role: Role): Promise<Role>
    delete(role: Role): Promise<void>
}
