import { User } from "../entities/User.js";
import { dataSource } from "../../shared/typeorm/index.js";
export class UsersRepository {
    constructor() {
        this.repository = dataSource.getRepository(User);
    }
    async findAll({ page, skip, take }) {
        const [users, count] = await this.repository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.role', 'role')
            .skip(skip)
            .take(take)
            .getManyAndCount();
        const result = {
            per_page: take,
            total: count,
            current_page: page,
            data: users
        };
        return result;
    }
    async findById(id) {
        return await this.repository.findOneBy({ id });
    }
    async findByName(name) {
        return await this.repository.findOneBy({ name });
    }
    async findByEmail(email) {
        return await this.repository.findOneBy({ email });
    }
    async create({ name, email, password, isAdmin, role }) {
        const user = await this.repository.create({
            name,
            email,
            password,
            isAdmin,
            role
        });
        return user;
    }
    async save(user) {
        return this.repository.save(user);
    }
    async delete(user) {
        await this.repository.remove(user);
    }
}
