import { MigrationInterface, QueryRunner } from "typeorm";

export class store1671286613321 implements MigrationInterface {
    name = 'store1671286613321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_357fd14514d792c57fcd5fd51d1\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`id_menu_section\` \`id_menu_section\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`menu_section\` DROP FOREIGN KEY \`FK_462e065b4b31d406cd99b5bd3b6\``);
        await queryRunner.query(`ALTER TABLE \`menu_section\` CHANGE \`id_store\` \`id_store\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_357fd14514d792c57fcd5fd51d1\` FOREIGN KEY (\`id_menu_section\`) REFERENCES \`menu_section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_section\` ADD CONSTRAINT \`FK_462e065b4b31d406cd99b5bd3b6\` FOREIGN KEY (\`id_store\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu_section\` DROP FOREIGN KEY \`FK_462e065b4b31d406cd99b5bd3b6\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_357fd14514d792c57fcd5fd51d1\``);
        await queryRunner.query(`ALTER TABLE \`menu_section\` CHANGE \`id_store\` \`id_store\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`menu_section\` ADD CONSTRAINT \`FK_462e065b4b31d406cd99b5bd3b6\` FOREIGN KEY (\`id_store\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`id_menu_section\` \`id_menu_section\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_357fd14514d792c57fcd5fd51d1\` FOREIGN KEY (\`id_menu_section\`) REFERENCES \`menu_section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
