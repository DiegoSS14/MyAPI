import { Request, Response } from 'express'
import { container } from "tsyringe"
import { ShowProfileUseCase } from './ShowProfileUseCase.js'
import { instanceToInstance } from 'class-transformer'

export class ShowProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const showProfileUseCase = container.resolve(ShowProfileUseCase)
        const user = await showProfileUseCase.execute({userId: request.user.id})
        return response.json(instanceToInstance(instanceToInstance(user)))
    }
}
