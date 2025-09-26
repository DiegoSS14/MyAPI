import express from "express";
import { RolesRepository } from "../../repositories/RolesRepository.js";

const rolesRouter = express()
const rolesRepository = new RolesRepository()


rolesRouter.get('/', (request, response) => {
    const roles = rolesRepository.findAll()
    return response.status(200).json(roles)
})

rolesRouter.post("/", (request, response) => {
    const { name } = request.body

    const roleAlreadyExists = rolesRepository.findByName(name)

    if (roleAlreadyExists) {
        return response.status(400).json({ message: 'Name already exists' })
    }

    const role = rolesRepository.create({ name })
    return response.status(201).json(role)
})

export { rolesRouter }
