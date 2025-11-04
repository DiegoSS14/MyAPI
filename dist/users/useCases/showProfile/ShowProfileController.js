import { container } from "tsyringe";
import { ShowProfileUseCase } from './ShowProfileUseCase.js';
import { instanceToInstance } from 'class-transformer';
export class ShowProfileController {
    async handle(request, response) {
        const showProfileUseCase = container.resolve(ShowProfileUseCase);
        const user = await showProfileUseCase.execute({ userId: request.user.id });
        return response.json(instanceToInstance(instanceToInstance(user)));
    }
}
