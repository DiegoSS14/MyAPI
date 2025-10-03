import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Role{

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @CreateDateColumn()
    created_at: Date

    constructor() {
        this.id = randomUUID()
    }
}
