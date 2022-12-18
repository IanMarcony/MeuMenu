import { MigrationInterface, QueryRunner } from "typeorm";

export class store1671401020981 implements MigrationInterface {
    name = 'store1671401020981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_357fd14514d792c57fcd5fd51d1\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_357fd14514d792c57fcd5fd51d1\` FOREIGN KEY (\`id_menu_section\`) REFERENCES \`menu_section\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_357fd14514d792c57fcd5fd51d1\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_357fd14514d792c57fcd5fd51d1\` FOREIGN KEY (\`id_menu_section\`) REFERENCES \`menu_section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
