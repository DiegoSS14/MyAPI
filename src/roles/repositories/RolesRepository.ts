import { Role } from "../entities/Role.js"

type RoleDTO = {
    name: string
}

export class RolesRepository {
    private roles: Array<Role>

    constructor() {
        this.roles = []
    }

    findAll() {
        return this.roles
    }

    findByName(name: string): Role | undefined {
        return this.roles.find(role => role.name === name)
    }

    create({ name }: RoleDTO) {
        const role = new Role()

        Object.assign(role, {
            name: name,
            created_at: new Date(),
        })

        this.roles.push(role)
        return role
    }
}
