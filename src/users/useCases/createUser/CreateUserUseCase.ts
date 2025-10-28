import { inject, injectable } from "tsyringe";
import { IRolesRepository } from "../../roles/repositories/IRolesRepository.js";
import { User } from "../entities/User.js";
import IUsersRepository from "../repositories/IUsersRepository.js";
import { Role } from "../../roles/entities/Role.js";
import { UserDTO } from "../repositories/IUsersRepository.js";
import { AppError } from "../../shared/error/AppError.js";
import { hash } from "bcryptjs";

export type CreateUserDTO = {
    name: string
    email: string
    password: string
    isAdmin: boolean
    roleId: string
}

@injectable()
export class CreateUserUseCase {

    private userRepository: IUsersRepository
    private rolesRepository: IRolesRepository

    constructor(
        @inject('UserRepository') userRepository: IUsersRepository,
        @inject('RolesRepository') rolesRepository: IRolesRepository
    ) {
        this.userRepository = userRepository
        this.rolesRepository = rolesRepository
    }

    async execute({name, email, password, isAdmin, roleId}: CreateUserDTO): Promise<User> {
        const emailExists = await this.userRepository.findByEmail(email)

        if(emailExists) {
            throw new AppError('E-mail address already used')
        }

        const role = await this.rolesRepository.findById(roleId)

        if(!role) {
            throw new AppError('Role not found', 404)
        }

        const passwordHashed = await hash(password, 10)

        const user = this.userRepository.create({
            name,
            email,
            password: passwordHashed,
            isAdmin,
            role
        })

        return user
    }
}
