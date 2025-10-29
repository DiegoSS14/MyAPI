import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository.js";
import { CreateUserController } from "../useCases/createUser/CreateUserController.js";
import { ListUsersUseCase } from "../useCases/listUsers/ListUsersUseCase.js";
container.registerSingleton('UserRepository', UsersRepository);
container.registerSingleton('CreateUserController', CreateUserController);
container.registerSingleton('ListUsersUseCase', ListUsersUseCase);
