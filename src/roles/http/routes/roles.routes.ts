import express from "express"
import { _createRoleController } from "../../useCases/createRole/index.js"
import { listRolesController } from "../../useCases/listRoles/index.js"
import { showRolesController } from "../../useCases/showRole/index.js"
import { editRolesController } from "../../useCases/editRole/index.js"
import { deleteRolesController } from "../../useCases/deleteRole/index.js"
import { celebrate, Joi, Segments } from "celebrate"

const rolesRouter = express()


rolesRouter.get('/', (request, response) => {
    return listRolesController.handle(request, response)
})

rolesRouter.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid()
    })
}), (request, response) => {
    return showRolesController.handle(request, response)
})

rolesRouter.post("/", celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
    })
}), (request, response) => {
    return _createRoleController.handle(request, response)
})

rolesRouter.put("/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid().required()
    }),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
    })
}), (request, response) => {
    return editRolesController.handle(request, response)
})

rolesRouter.delete("/:id", celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().uuid()
    })
}), (request, response) => {
    return deleteRolesController.handle(request, response)
})

export { rolesRouter }

