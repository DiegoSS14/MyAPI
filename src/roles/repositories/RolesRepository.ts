import { Role } from "../entities/Role.js"

type RoleDTO = {
    name: string
}

export class RolesRepository {
    private roles: Array<Role>
    private static INSTANCE: RolesRepository

    private constructor() {
        this.roles = []
    }

    public static getInstance() {
        if(!RolesRepository.INSTANCE) {
            RolesRepository.INSTANCE = new RolesRepository()
        }

        return RolesRepository.INSTANCE
    }

    findAll() {
        return this.roles
    }

    findByName(name: string): Role | undefined {
        return this.roles.find(role => role.name === name)
    }

    create({ name }: RoleDTO) {
        let role: Role = new Role()

        // Object.assign(role, {
        //     name: name,
        //     created_at: new Date(),
        // })

        role = { ...role, ...{ name: name, created_at: new Date() } }

        this.roles.push(role)
        return role
    }
}
