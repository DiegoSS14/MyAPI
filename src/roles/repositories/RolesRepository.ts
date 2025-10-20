import { Role } from "../entities/Role.js"
import { dataSource } from "../../shared/typeorm/index.js"
import type { Repository } from "typeorm"
import { IRolesRepository, PaginateParams, RoleDTO, RolesPaginateProperties } from "./IRolesRepository.js"

export class RolesRepository implements IRolesRepository {
    private repository: Repository<Role>

    constructor() {
        this.repository = dataSource.getRepository(Role)
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
