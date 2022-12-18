import { MigrationInterface, QueryRunner } from "typeorm";

export class store1671398681829 implements MigrationInterface {
    name = 'store1671398681829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`url_image_product\``);
        await queryRunner.query(`ALTER TABLE \`store\` ADD \`name_code\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`image_product_filename\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1383a633da66c6236260838a7c7\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`id_store\` \`id_store\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1383a633da66c6236260838a7c7\` FOREIGN KEY (\`id_store\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1383a633da66c6236260838a7c7\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`id_store\` \`id_store\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1383a633da66c6236260838a7c7\` FOREIGN KEY (\`id_store\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`image_product_filename\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP COLUMN \`name_code\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`url_image_product\` text NOT NULL`);
    }

}
