import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';
import { CreateLoginUseCase } from './CreateLoginUseCase.js';
export class CreateLoginController {
    async handle(request, response) {
        const { email, password } = request.body;
        const createLoginUseCase = await container.resolve(CreateLoginUseCase);
        const result = await createLoginUseCase.execute({
            email,
            password
        });
        return response.json(instanceToInstance({
            user: result.user,
            token: result.token
        }));
    }
}
