import { RolesRepository } from "../../repositories/RolesRepository.js";
import { CreateRoleController } from "./CreateRoleController.js";
import { CreateRoleUseCase } from "./CreateRoleUseCase.js";
const rolesRepository = RolesRepository.getInstance();
const createRoleUseCase = new CreateRoleUseCase(rolesRepository);
export const _createRoleController = new CreateRoleController(createRoleUseCase);
