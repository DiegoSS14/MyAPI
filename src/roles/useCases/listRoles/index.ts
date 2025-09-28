import { RolesRepository } from "../../repositories/RolesRepository.js";
import { ListRolesController } from "./ListRolesController.js";
import { ListRolesUseCase } from "./ListRolesUseCase.js";

const rolesRepository = new RolesRepository()
const listRolesUseCase = new ListRolesUseCase(rolesRepository)
export const listRolesController = new ListRolesController(listRolesUseCase)
