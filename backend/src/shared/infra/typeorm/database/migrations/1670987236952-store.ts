import { MigrationInterface, QueryRunner } from "typeorm";

export class store1670987236952 implements MigrationInterface {
    name = 'store1670987236952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contract_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`value\` float NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`email\` text NOT NULL, \`password\` text NOT NULL, \`created_at\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`store\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`phone_number\` varchar(20) NOT NULL, \`url_profile_image\` text NOT NULL, \`url_banner_image\` text NOT NULL, \`open_hour\` datetime NOT NULL, \`close_hour\` datetime NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`id_status\` int NULL, \`id_contract_type\` int NULL, \`id_admin\` int NULL, UNIQUE INDEX \`REL_f3289881ea567b4ea6766ce4e4\` (\`id_status\`), UNIQUE INDEX \`REL_c510e46c0ddf2c08572f351d8d\` (\`id_contract_type\`), UNIQUE INDEX \`REL_e40400e482e68345693239b324\` (\`id_admin\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu_section\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`id_store\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`url_image_product\` text NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`id_menu_section\` int NULL, \`id_store\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_f3289881ea567b4ea6766ce4e40\` FOREIGN KEY (\`id_status\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_c510e46c0ddf2c08572f351d8d3\` FOREIGN KEY (\`id_contract_type\`) REFERENCES \`contract_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_e40400e482e68345693239b3243\` FOREIGN KEY (\`id_admin\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_section\` ADD CONSTRAINT \`FK_462e065b4b31d406cd99b5bd3b6\` FOREIGN KEY (\`id_store\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_5c8ce29c6ecbed1e604571e87ce\` FOREIGN KEY (\`id_menu_section\`) REFERENCES \`menu_section\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_0ceb44edd5ebfbeccb3ddf46eb2\` FOREIGN KEY (\`id_store\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_0ceb44edd5ebfbeccb3ddf46eb2\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_5c8ce29c6ecbed1e604571e87ce\``);
        await queryRunner.query(`ALTER TABLE \`menu_section\` DROP FOREIGN KEY \`FK_462e065b4b31d406cd99b5bd3b6\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_e40400e482e68345693239b3243\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_c510e46c0ddf2c08572f351d8d3\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_f3289881ea567b4ea6766ce4e40\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`menu_section\``);
        await queryRunner.query(`DROP INDEX \`REL_e40400e482e68345693239b324\` ON \`store\``);
        await queryRunner.query(`DROP INDEX \`REL_c510e46c0ddf2c08572f351d8d\` ON \`store\``);
        await queryRunner.query(`DROP INDEX \`REL_f3289881ea567b4ea6766ce4e4\` ON \`store\``);
        await queryRunner.query(`DROP TABLE \`store\``);
        await queryRunner.query(`DROP TABLE \`status\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`contract_type\``);
    }

}
