import { Role } from "../entities/Role.js"
import { dataSource } from "../../shared/typeorm/index.js"
import type { Repository } from "typeorm"

type RoleDTO = {
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

export class RolesRepository {
    private repository: Repository<Role>
    private static INSTANCE: RolesRepository

    private constructor() {
        this.repository = dataSource.getRepository(Role)
    }

    public static getInstance() {
        if (!RolesRepository.INSTANCE) {
            RolesRepository.INSTANCE = new RolesRepository()
        }

        return RolesRepository.INSTANCE
    }

    async findAll({ page, skip, take }: PaginateParams): Promise<RolesPaginateProperties> {
        const [roles, count] = await this.repository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount()

        const result: RolesPaginateProperties = {
            per_page: take,
            current_page: page,
            total: count,
            data: roles
        }

        return result
    }

    async findByName(name: string): Promise<Role | null> {
        return await this.repository.findOneBy({ name })
    }

    async findById(id: string): Promise<Role | null> {
        return await this.repository.findOneBy({ id })
    }

    async create({ name }: RoleDTO): Promise<Role> {
        const role = await this.repository.create({ name })
        return this.repository.save(role)
    }

    async save(role: Role): Promise<Role> {
        return await this.repository.save(role)
    }

    async delete(role: Role): Promise<void> {
        await this.repository.remove(role)
    }
}
