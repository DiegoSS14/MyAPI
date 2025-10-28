import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { RolesRepository } from "../../../roles/repositories/RolesRepository.js";
import { AppError } from "../../../shared/error/AppError.js";
import { User } from "../../entities/User.js";
import { UsersRepository } from "../../repositories/UsersRepository.js";

export type CreateUserDTO = {
    name: string
    email: string
    password: string
    isAdmin: boolean
    roleId: string
}

@injectable()
export class CreateUserUseCase {

    constructor(
        @inject('RolesRepository')
        private rolesRepository: RolesRepository,
        @inject('UserRepository')
        private userRepository: UsersRepository
    ) { }

    async execute({ name, email, password, isAdmin, roleId }: CreateUserDTO): Promise<User> {
        const emailExists = await this.userRepository.findByEmail(email)
        if (emailExists) {
            throw new AppError('Email address already used')
        }
        const role = await this.rolesRepository.findById(roleId)
        if (!role) {
            throw new AppError('Role not found', 404)
        }

        const passwordHashed = await hash(password, 10)

        const user = await this.userRepository.create({
            name,
            email,
            password: passwordHashed,
            isAdmin,
            role
        })

        return user
    }
}
