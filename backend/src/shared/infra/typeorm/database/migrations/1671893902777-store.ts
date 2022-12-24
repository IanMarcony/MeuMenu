import { MigrationInterface, QueryRunner } from "typeorm";

export class store1671893902777 implements MigrationInterface {
    name = 'store1671893902777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_super_user\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_super_user\``);
    }

}
