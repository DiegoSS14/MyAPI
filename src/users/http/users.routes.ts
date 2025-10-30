import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from "express";
import { container } from "tsyringe";
import { CreateUserController } from "../useCases/createUser/CreateUserController.js";
import { ListUsersController } from '../useCases/listUsers/ListUsersController.js';
import { CreateLoginController } from '../useCases/createLogin/CreateLoginController.js';
import { isAuthenticated } from '../../shared/middlewares/isAuthenticated.js';

const usersRouter = Router()

const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)

usersRouter.post('/', isAuthenticated, celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        isAdmin: Joi.boolean().required(),
        roleId: Joi.string().uuid().required()
    })
}),
    (request, response) => {
        return createUserController.handle(request, response)
    }
)

usersRouter.get('/', isAuthenticated, celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
        limit: Joi.number()
    })
}),
    (request, response) => {
        listUsersController.handle(request, response)
    }
)

usersRouter.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}),
    (request, response) => {
        return createLoginController.handle(request, response)
    }
)

export { usersRouter }

