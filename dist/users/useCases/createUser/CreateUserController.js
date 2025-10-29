import { container } from "tsyringe";
import { CreateUserUseCase } from './CreateUserUseCase.js';
import { instanceToInstance } from 'class-transformer';
export class CreateUserController {
    async handle(request, response) {
        const createRoleUseCase = container.resolve(CreateUserUseCase);
        const { name, email, password, isAdmin, roleId } = request.body;
        const user = await createRoleUseCase.execute({
            name,
            email,
            password,
            isAdmin,
            roleId
        });
        return response.status(201).json(instanceToInstance(user));
    }
}
