import { randomUUID } from "crypto";
import { Exclude, Expose } from "class-transformer"
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

    @Expose({name: 'avatar_url'}) // Adiciona campo avatar_url à entidade de forma dinâmica
    get avatarUrl(): string | null {
        if(!this.avatar) {
            return null
        }

        return `${process.env.AVATAR_URL}/${this.avatar}`
    }

    constructor() {
        this.id = randomUUID()
    }
}
