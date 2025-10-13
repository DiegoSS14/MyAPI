import express from "express"
import { _createRoleController } from "../../useCases/createRole/index.js"
import { listRolesController } from "../../useCases/listRoles/index.js"
import { showRolesController } from "../../useCases/showRole/index.js"

const rolesRouter = express()


rolesRouter.get('/', (request, response) => {
    return listRolesController.handle(request, response)
})

rolesRouter.get('/:id', (request, response) => {
    return showRolesController.handle(request, response)
})

rolesRouter.post("/", (request, response) => {
    return _createRoleController.handle(request, response)
})

export { rolesRouter }

