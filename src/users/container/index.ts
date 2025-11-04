import { container } from "tsyringe";
import IUsersRepository from "../repositories/IUsersRepository.js";
import { UsersRepository } from "../repositories/UsersRepository.js";
import { CreateLoginController } from "../useCases/createLogin/CreateLoginController.js";
import { CreateUserController } from "../useCases/createUser/CreateUserController.js";
import { ListUsersController } from "../useCases/listUsers/ListUsersController.js";
import { UpdateAvatarController } from "../useCases/updateAvatar/UpdateAvatarController.js";
import { ShowProfileController } from "../useCases/showProfile/ShowProfileController.js";
import { UpdateProfileController } from "../useCases/updateProfile/UpdateProfileController.js";

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('ListUsersController', ListUsersController)
container.registerSingleton('CreateLoginController', CreateLoginController)
container.registerSingleton('UpdateAvatarController', UpdateAvatarController)
container.registerSingleton('ShowProfileController', ShowProfileController)
container.registerSingleton('UpdateProfileController', UpdateProfileController)
