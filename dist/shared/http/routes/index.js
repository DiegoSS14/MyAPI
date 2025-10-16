import { Router } from "express";
import { rolesRouter } from "../../../roles/http/routes/roles.routes.js";
const routes = Router();
routes.use('/roles', rolesRouter);
export { routes };
