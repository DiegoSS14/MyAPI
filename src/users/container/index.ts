import { container } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository.js";
import { UsersRepository } from "../repositories/UsersRepository.js";
import { CreateUserController } from "../useCases/createUser/CreateUserController.js";

container.registerSingleton<IUsersRepository>('UserRepository', UsersRepository)
container.registerSingleton('CreateUserController', CreateUserController)
