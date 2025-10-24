import { randomUUID } from "crypto";
import { Column, Entity } from "typeorm";

@Entity('roles')
class Role {

    @Column()
    private id!: string

    @Column()
    private name: string

    @Column()
    private email: string

    @Column()
    private password: string

    @Column()
    private avatar: string

    @Column()
    private isAdmin: boolean

    @Column()
    private createdAt!: Date

    @Column()
    private roleId: string

    constructor() {
        this.id = randomUUID()
    }
}
