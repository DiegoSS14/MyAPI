import { User } from "../../entity/User.js"
import { Role } from "../../roles/entities/Role.js"

type UserDTO = {
    name: string
    email: string
    password: string
    isAdmin: boolean
    role: Role
}

export type PaginateParams = {
    page: number
    skip: number
    take: number
}

export type UsersPaginateProperties = {
    per_page: number
    total: number
    current_page: number
    data: User[]
}

export default interface IRolesRepository {
    findAll({ page, skip, take }: PaginateParams): Promise<UsersPaginateProperties>
    findByName(name: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    create({ name, email, password, isAdmin, role }: UserDTO): Promise<User>
    save(user: User): Promise<User>
    delete(user: User): Promise<void>
}
