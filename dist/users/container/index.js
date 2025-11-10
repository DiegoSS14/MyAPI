import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository.js";
import { CreateLoginController } from "../useCases/createLogin/CreateLoginController.js";
import { CreateUserController } from "../useCases/createUser/CreateUserController.js";
import { ListUsersController } from "../useCases/listUsers/ListUsersController.js";
import { UpdateAvatarController } from "../useCases/updateAvatar/UpdateAvatarController.js";
import { ShowProfileController } from "../useCases/showProfile/ShowProfileController.js";
import { UpdateProfileController } from "../useCases/updateProfile/UpdateProfileController.js";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository.js";
import { CreateAcessTokenAndRefreshTokenController } from "../useCases/createAcessTokenAndRefreshToken/CreateAcessTokenAndRefreshTokenController.js";
// Repositories
container.registerSingleton('UsersRepository', UsersRepository);
container.registerSingleton('RefreshTokenRepository', RefreshTokenRepository);
// Controllers
container.registerSingleton('CreateUserController', CreateUserController);
container.registerSingleton('ListUsersController', ListUsersController);
container.registerSingleton('CreateLoginController', CreateLoginController);
container.registerSingleton('CreateAcessTokenAndRefreshTokenController', CreateAcessTokenAndRefreshTokenController);
container.registerSingleton('UpdateAvatarController', UpdateAvatarController);
container.registerSingleton('ShowProfileController', ShowProfileController);
container.registerSingleton('UpdateProfileController', UpdateProfileController);
