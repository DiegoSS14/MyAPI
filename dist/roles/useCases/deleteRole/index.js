import { RolesRepository } from "../../repositories/RolesRepository.js";
import { DeleteRolesUseCase } from "./DeleteRolesUseCase.js";
import { DeleteRolesController } from "./DeleteRolesController.js";
const rolesRepository = RolesRepository.getInstance();
const deleteRolesUseCase = new DeleteRolesUseCase(rolesRepository);
export const deleteRolesController = new DeleteRolesController(deleteRolesUseCase);
