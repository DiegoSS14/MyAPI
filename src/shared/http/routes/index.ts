import { AppError } from "../../error/AppError.js";
import { Router } from "express";
import { rolesRouter } from "../../../roles/http/routes/roles.routes.js";

const routes = Router()

routes.get('/', (request, response) => {
    throw new AppError('Acesso negado')
})

routes.use('/roles', rolesRouter)

export { routes };

