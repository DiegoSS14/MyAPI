import { randomUUID } from "crypto";
import { Column, Entity, ManyToOne } from "typeorm";
import { Role } from "../../roles/entities/Role.js";

@Entity('users')
class User {

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

    @ManyToOne(() => Role, {cascade: true}) // Fazendo relacionamento entre tabelas, cascade utilizado para realizar operaões em castata entre tabelas
    role: Role

    @Column()
    private roleId: string

    constructor() {
        this.id = randomUUID()
    }
}
