import { randomUUID } from "crypto";
import { Exclude } from "class-transformer"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Role } from "../../roles/entities/Role.js";

@Entity('users')
export class User {

    @PrimaryColumn('varchar')
    id?: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    @Exclude()
    password: string

    @Column({ nullable: true })
    avatar?: string

    @Column({ name: 'isAdmin', default: false })
    isAdmin!: boolean

    @CreateDateColumn()
    created_at?: Date

    @ManyToOne(() => Role, { cascade: true }) // Fazendo relacionamento entre tabelas, cascade utilizado para realizar operaões em castata entre tabelas
    role: Role

    @Column({ nullable: true })
    roleId?: string

    constructor() {
        this.id = randomUUID()
    }
}
