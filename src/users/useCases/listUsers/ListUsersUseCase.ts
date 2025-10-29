import { inject, injectable } from "tsyringe"
import { UsersPaginateProperties } from "../../repositories/IUsersRepository.js"
import { UsersRepository } from "../../repositories/UsersRepository.js"

type ListUsersUseCaseParams = {
    page: number
    limit: number
}

@injectable()
export class ListUsersUseCase {
    constructor(
        @inject('UserRepository')
        private usersRepository: UsersRepository
    ) { }

    async execute({ page, limit }: ListUsersUseCaseParams): Promise<UsersPaginateProperties> {
        const take = limit
        const skip = (Number(page) - 1) * take
        return this.usersRepository.findAll({ page, skip, take })
    }
}
