import express from "express"
import { celebrate, Joi, Segments } from "celebrate"
import { container } from "tsyringe"
import { ListRolesController } from "../../useCases/listRoles/ListRolesController.js"
import { ShowRolesController } from "../../useCases/showRole/ShowRoleController.js"
import { CreateRoleController } from "../../useCases/createRole/CreateRoleController.js"
import { EditRolesController } from "../../useCases/editRole/EditRolesController.js"
import { DeleteRolesController } from "../../useCases/deleteRole/DeleteRolesController.js"

const rolesRouter = express()

const listRolesController = container.resolve(ListRolesController)
const showRolesController = container.resolve(ShowRolesController)
const _createRoleController = container.resolve(CreateRoleController)
const editRolesController = container.resolve(EditRolesController)
const deleteRolesController = container.resolve(DeleteRolesController)


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

