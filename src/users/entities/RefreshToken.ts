import { Column, Entity, PrimaryColumn } from "typeorm"
import crypto from "crypto"

@Entity('refresh_tokens')
export class RefreshToken {

    @PrimaryColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    token: string

    @Column()
    valid: boolean

    @Column()
    expires: Date

    @Column()
    created_at: Date

    constructor() {
        this.id = crypto.randomUUID()
    }
}
