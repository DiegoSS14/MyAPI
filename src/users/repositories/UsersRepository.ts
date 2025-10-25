
import { Repository } from "typeorm";
import { User } from "../entities/User.js";
import { dataSource } from "../../shared/typeorm/index.js";
import IUsersRepository, { PaginateParams, UserDTO, UsersPaginateProperties } from "./IUsersRepository.js";

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = dataSource.getRepository(User)
    }

    async findAll({ page, skip, take }: PaginateParams): Promise<UsersPaginateProperties> {
        const [users, count] = await this.repository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.role', 'role')
            .skip(skip)
            .take(take)
            .getManyAndCount()

        const result: UsersPaginateProperties = {
            per_page: take,
            total: count,
            current_page: page,
            data: users
        }

        return result
    }

    async findById(id: string): Promise<User | null> {
        return await this.repository.findOneBy({ id })
    }

    async findByName(name: string): Promise<User | null> {
        return await this.repository.findOneBy({ name })
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email })
    }

    async create({ name, email, password, isAdmin, role }: UserDTO): Promise<User> {
        return this.repository.create({
            name,
            email,
            password,
            isAdmin,
            role
        })
    }

    async save(user: User): Promise<User> {
        return this.repository.save(user)
    }

    async delete(user: User): Promise<void> {
        await this.repository.remove(user)
    }
}
