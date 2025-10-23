import { DataSource } from 'typeorm'
import { CreateRolesTable1759499307163 } from './migrations/1759499307163-CreateRolesTable.js'
import { Role } from '../../roles/entities/Role.js'
import { CreateUsersTable1761179522807 } from './migrations/1761179522807-CreateUsersTable.js'

export const dataSource = new DataSource({
    type: 'sqlite',
    database: './db.sqlite',
    entities: [Role],
    migrations: [
        CreateRolesTable1759499307163, CreateUsersTable1761179522807
    ],
})
