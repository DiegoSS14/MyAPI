import { container } from "tsyringe";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase.js";
import { instanceToInstance } from "class-transformer";
export class UpdateProfileController {
    async handle(request, response) {
        const { name, email, password, old_password } = request.body;
        const userId = request.user.id;
        const updateProfileUseCase = container.resolve(UpdateProfileUseCase);
        const user = await updateProfileUseCase.execute({
            userId,
            name,
            email,
            password,
            old_password
        });
        return response.json(instanceToInstance(user));
    }
}
