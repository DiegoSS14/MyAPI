import { Role } from "../entities/Role.js";
import { dataSource } from "../../shared/typeorm/index.js";
export class RolesRepository {
    constructor() {
        this.repository = dataSource.getRepository(Role);
    }
    static getInstance() {
        if (!RolesRepository.INSTANCE) {
            RolesRepository.INSTANCE = new RolesRepository();
        }
        return RolesRepository.INSTANCE;
    }
    async findAll({ page, skip, take }) {
        const [roles, count] = await this.repository
            .createQueryBuilder()
            .skip(skip)
            .take(take)
            .getManyAndCount();
        const result = {
            per_page: take,
            current_page: page,
            total: count,
            data: roles
        };
        return result;
    }
    async findByName(name) {
        return await this.repository.findOneBy({ name });
    }
    async findById(id) {
        return await this.repository.findOneBy({ id });
    }
    async create({ name }) {
        const role = await this.repository.create({ name });
        return this.repository.save(role);
    }
    async save(role) {
        return await this.repository.save(role);
    }
}
