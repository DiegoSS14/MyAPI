import { container } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository.js";
import { UsersRepository } from "../repositories/UsersRepository.js";
import { CreateLoginController } from "../useCases/createLogin/CreateLoginController.js";
import { CreateUserController } from "../useCases/createUser/CreateUserController.js";
import { ListUsersController } from "../useCases/listUsers/ListUsersController.js";

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('ListUsersController', ListUsersController)
container.registerSingleton('CreateLoginController', CreateLoginController)
