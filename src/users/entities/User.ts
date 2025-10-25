import { randomUUID } from "crypto";
import { Column, Entity, ManyToOne } from "typeorm";
import { Role } from "../../roles/entities/Role.js";

@Entity('users')
export class User {

    @Column()
    id?: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    avatar: string

    @Column()
    isAdmin: boolean

    @Column()
    createdAt?: Date

    @ManyToOne(() => Role, { cascade: true }) // Fazendo relacionamento entre tabelas, cascade utilizado para realizar operaões em castata entre tabelas
    role: Role

    @Column()
    roleId: string

    constructor() {
        this.id = randomUUID()
    }
}
