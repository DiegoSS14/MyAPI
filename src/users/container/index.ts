import { container } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository.js";
import { UsersRepository } from "../repositories/UsersRepository.js";

container.registerSingleton<IUsersRepository>(
    'UserRepository',
    UsersRepository
)
