import { RolesRepository } from "../../repositories/RolesRepository.js"
import { ShowRolesUseCase } from "./ShowRolesUseCase.js"
import { ShowRolesController } from "./ShowRolesController.js"

const rolesRepository = RolesRepository.getInstance()
const showRolesUseCase = new ShowRolesUseCase(rolesRepository)
export const showRolesController = new ShowRolesController(showRolesUseCase)
