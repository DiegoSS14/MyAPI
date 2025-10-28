import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository.js";
import IUsersRepository from "../repositories/IUsersRepository.js";
import { CreateUserController } from "../useCases/createUser/CreateUserController.js";

container.registerSingleton<IUsersRepository>('UserRepository', UsersRepository)
container.registerSingleton('CreateUserController', CreateUserController)
