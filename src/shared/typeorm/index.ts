import { DataSource } from 'typeorm'
import { CreateRolesTable1759499307163 } from './migrations/1759499307163-CreateRolesTable.js'
import { Role } from '../../roles/entities/Role.js'
import { CreateUsersTable1761179522807 } from './migrations/1761179522807-CreateUsersTable.js'
import { AddRoleIdToUsersTable1761263808611 } from './migrations/1761263808611-AddRoleIdToUsersTable.js'
import { User } from '../../users/entities/User.js'
import { CreateRefreshTokensTable1762454496318 } from './migrations/1762454496318-CreateRefreshTokensTable.js'
import { RefreshToken } from '../../users/entities/RefreshToken.js'

export const dataSource = new DataSource({
    type: 'sqlite',
    database: './db.sqlite',
    entities: [Role, User, RefreshToken],
    migrations: [
        CreateRolesTable1759499307163,
        CreateUsersTable1761179522807,
        AddRoleIdToUsersTable1761263808611,
        CreateRefreshTokensTable1762454496318
    ],
})
