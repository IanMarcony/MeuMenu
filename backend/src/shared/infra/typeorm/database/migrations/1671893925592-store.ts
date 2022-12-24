import { MigrationInterface, QueryRunner } from 'typeorm';
import 'dotenv/config';
import { AppDataSource } from '../../../../../data-source';
import User from '../../../../../modules/users/infra/typeorm/entities/User';

export class store1671893925592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          name: process.env.ADMIN_NAME,
          cpf: process.env.ADMIN_CPF,
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          is_super_user: true,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .where('is_super_user = :is_super_user', { is_super_user: true })
      .execute();
  }
}
