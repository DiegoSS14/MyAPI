import { Router } from "express";

const routes = Router()

routes.get('/', (request, response) => {
    response.status(200).json('Olá, Dev!')
})

export { routes }
