import express from "express";
import { RolesRepository } from "../../repositories/RolesRepository.js";
import { createRoleController } from "../../useCases/createRole/index.js";

const rolesRouter = express()
const rolesRepository = new RolesRepository()


rolesRouter.get('/', (request, response) => {
    const roles = rolesRepository.findAll()
    return response.status(200).json(roles)
})

rolesRouter.post("/", (request, response) => {
    return createRoleController.handle(request, response)
})

export { rolesRouter }
