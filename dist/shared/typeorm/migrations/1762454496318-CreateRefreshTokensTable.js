import { Table } from "typeorm";
export class CreateRefreshTokensTable1762454496318 {
    async up(queryRunner) {
        await queryRunner.createTable(new Table({
            name: 'refresh_tokens',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'user_id',
                    type: 'varchar'
                },
                {
                    name: 'token',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'valid',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'expires',
                    type: 'timestamp',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                }
            ],
            foreignKeys: [
                {
                    name: 'RefreshTokensUsers',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
            ]
        }));
    }
    async down(queryRunner) {
        queryRunner.dropTable('refresh_tokens');
    }
}
