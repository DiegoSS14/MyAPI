import express from "express";
import { createRoleController } from "../../useCases/createRole/index.js";
import { listRolesController } from "../../useCases/listRoles/index.js";

const rolesRouter = express()


rolesRouter.get('/', (request, response) => {
    return listRolesController.handle(request, response)
})

rolesRouter.post("/", (request, response) => {
    return createRoleController.handle(request, response)
})

export { rolesRouter }

