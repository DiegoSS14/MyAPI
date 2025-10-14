import { RolesRepository } from "../../repositories/RolesRepository.js";
import { EditRolesUseCase } from "./EditRolesUseCase.js";
import { EditRolesController } from "./EditRolesController.js";
const rolesRepository = RolesRepository.getInstance();
const editRolesUseCase = new EditRolesUseCase(rolesRepository);
export const editRolesController = new EditRolesController(editRolesUseCase);
