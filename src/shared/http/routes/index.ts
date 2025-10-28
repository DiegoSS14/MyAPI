import { Router } from "express";
import { rolesRouter } from "../../../roles/http/routes/roles.routes.js";
import { usersRouter } from "../../../users/http/users.routes.js";

const routes = Router()

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)

export { routes };

