import { hash } from "bcryptjs";
import { dataSource } from "../index.js";
import { randomUUID } from "crypto";

async function Create() {
    const connection = await dataSource.initialize()
    try {
        const roleId = randomUUID()
        // parameterized query: avoids unquoted UUIDs and SQL syntax errors
        await connection.query(
            `INSERT INTO roles(id, name) VALUES ($1, $2)`,
            [roleId, 'T.I.']
        )

        const userId = randomUUID()
        const adminPassword = await hash('1234', 10)
        await connection.query(
            `INSERT INTO users(id, name, email, password, "isAdmin", roleId) VALUES ($1, $2, $3, $4, $5, $6)`,
            [userId, 'admin', 'admin@gmail.com', adminPassword, true, roleId]
        )
    } finally {
        await connection.destroy()
    }
}

Create().then(() => console.log('Admin created')).catch((error) => console.log('Error to create admin: ', error))
