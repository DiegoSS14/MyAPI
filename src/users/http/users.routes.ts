import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Segments, Joi} from 'celebrate'
import { CreateUserController } from "../useCases/createUser/CreateUserController.js";

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)

usersRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            isAdmin: Joi.boolean().required(),
            roleId: Joi.string().uuid().required()
        }
    }),
    (request, response) => {
        createUserController.handle(request, response)
    }
)

export { usersRouter }
