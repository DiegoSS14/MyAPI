import { TableColumn, TableForeignKey } from "typeorm";
export class AddRoleIdToUsersTable1761263808611 {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'roleId',
            type: 'uuid',
            isNullable: true
        }));
        await queryRunner.createForeignKey('users', new TableForeignKey({
            name: 'UsersRoles',
            columnNames: ['roleId'],
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL'
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('users', 'UsersRoles');
        await queryRunner.dropColumn('users', 'roleId');
    }
}
