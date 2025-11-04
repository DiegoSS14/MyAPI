import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from "express"
import multer from 'multer'
import { container } from "tsyringe"
import { CreateUserController } from "../useCases/createUser/CreateUserController.js"
import { ListUsersController } from '../useCases/listUsers/ListUsersController.js'
import { CreateLoginController } from '../useCases/createLogin/CreateLoginController.js'
import { isAuthenticated } from '../../shared/middlewares/isAuthenticated.js'
import uploadConfig from "../../config/upload.js"
import { UpdateAvatarController } from '../useCases/updateAvatar/UpdateAvatarController.js'
import { ShowProfileController } from '../useCases/showProfile/ShowProfileController.js'
import { UpdateProfileController } from '../useCases/updateProfile/UpdateProfileController.js'

const usersRouter = Router()

const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)
const showProfileController = container.resolve(ShowProfileController)
const updateProfileController = container.resolve(UpdateProfileController)

const upload = multer(uploadConfig)

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

usersRouter.patch('/avatar',
    isAuthenticated,
    upload.single('avatar'),
    (request, response) => {
        return updateAvatarController.handle(request, response)
    }
)

usersRouter.get('/profile', isAuthenticated, (request, response) => {
    return showProfileController.handle(request, response)
})

usersRouter.put('/profile', isAuthenticated, celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().optional(),
        password_confirmation: Joi.string().valid(
            Joi.ref('password')).
            when('password', {
                is: Joi.exist(),
                then: Joi.required()
            }),
        old_password: Joi.string(),
    })
}),
    (request, response) => {
        return updateProfileController.handle(request, response)
    })

export { usersRouter }

