import express from "express"
import { _createRoleController } from "../../useCases/createRole/index.js"
import { listRolesController } from "../../useCases/listRoles/index.js"
import { showRolesController } from "../../useCases/showRole/index.js"
import { editRolesController } from "../../useCases/editRole/index.js"
import { deleteRolesController } from "../../useCases/deleteRole/index.js"

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

rolesRouter.put("/:id", (request, response) => {
    return editRolesController.handle(request, response)
})

rolesRouter.delete("/:id", (request, response) => {
    return deleteRolesController.handle(request, response)
})

export { rolesRouter }

