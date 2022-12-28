import { MigrationInterface, QueryRunner } from "typeorm";

export class store1672186913815 implements MigrationInterface {
    name = 'store1672186913815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`email\` text NOT NULL, \`cpf\` text NOT NULL, \`is_super_user\` tinyint NOT NULL DEFAULT 0, \`password\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contract_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`value\` float NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`status\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`store\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`name_code\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`phone_number\` varchar(20) NOT NULL, \`url_profile_image\` text NOT NULL, \`url_banner_image\` text NOT NULL, \`open_hour\` datetime NOT NULL, \`close_hour\` datetime NOT NULL, \`start_active_at\` datetime NULL, \`status_id\` int NOT NULL, \`id_admin\` int NOT NULL, \`contract_type_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_e40400e482e68345693239b324\` (\`id_admin\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`image_product_filename\` text NOT NULL, \`id_menu_section\` int NOT NULL, \`id_store\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menu_section\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`id_store\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(36) NOT NULL, \`user_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_9e144a67be49e5bba91195ef5d\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`fk_status_id\` FOREIGN KEY (\`status_id\`) REFERENCES \`status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`fk_contract_type_id\` FOREIGN KEY (\`contract_type_id\`) REFERENCES \`contract_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`store\` ADD CONSTRAINT \`FK_e40400e482e68345693239b3243\` FOREIGN KEY (\`id_admin\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_357fd14514d792c57fcd5fd51d1\` FOREIGN KEY (\`id_menu_section\`) REFERENCES \`menu_section\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1383a633da66c6236260838a7c7\` FOREIGN KEY (\`id_store\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menu_section\` ADD CONSTRAINT \`FK_462e065b4b31d406cd99b5bd3b6\` FOREIGN KEY (\`id_store\`) REFERENCES \`store\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_tokens\` ADD CONSTRAINT \`FK_9e144a67be49e5bba91195ef5de\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_tokens\` DROP FOREIGN KEY \`FK_9e144a67be49e5bba91195ef5de\``);
        await queryRunner.query(`ALTER TABLE \`menu_section\` DROP FOREIGN KEY \`FK_462e065b4b31d406cd99b5bd3b6\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1383a633da66c6236260838a7c7\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_357fd14514d792c57fcd5fd51d1\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`FK_e40400e482e68345693239b3243\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`fk_contract_type_id\``);
        await queryRunner.query(`ALTER TABLE \`store\` DROP FOREIGN KEY \`fk_status_id\``);
        await queryRunner.query(`DROP INDEX \`REL_9e144a67be49e5bba91195ef5d\` ON \`user_tokens\``);
        await queryRunner.query(`DROP TABLE \`user_tokens\``);
        await queryRunner.query(`DROP TABLE \`menu_section\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`REL_e40400e482e68345693239b324\` ON \`store\``);
        await queryRunner.query(`DROP TABLE \`store\``);
        await queryRunner.query(`DROP TABLE \`status\``);
        await queryRunner.query(`DROP TABLE \`contract_type\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
