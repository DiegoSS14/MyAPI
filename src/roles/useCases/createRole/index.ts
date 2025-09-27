import { RolesRepository } from "../../repositories/RolesRepository.js";
import { CreateRoleController } from "./createRoleController.js";
import { CreateRoleUseCase } from "./createRoleUseCase.js";


const rolesRepository = new RolesRepository
const createRoleUseCase = new CreateRoleUseCase(rolesRepository)
export const createRoleController = new CreateRoleController(createRoleUseCase)
