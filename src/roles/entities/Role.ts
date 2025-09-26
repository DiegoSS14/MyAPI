import { randomUUID } from "crypto";

export class Role{
    id: string
    name: string
    created_at: Date

    constructor() {
        this.id = randomUUID()
    }
}
