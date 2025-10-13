import { Table } from "typeorm";
export class CreateRolesTable1759499307163 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('roles');
    }
}
