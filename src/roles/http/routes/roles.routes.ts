import express from "express";
import { Role } from "../../entities/Role.js";

const rolesRouter = express()

// Representação do banco de dados
const roles: Array<Role> = []

rolesRouter.get('/', (request, response) => {
    return response.status(200).json(roles)
})

rolesRouter.post("/", (request, response) => {
    const { name } = request.body

    const role = new Role()

    Object.assign(role, {
        name: name,
        created_at: new Date(),
    })

    roles.push(role)

    return response.status(201).json(role)
})

export {rolesRouter}
