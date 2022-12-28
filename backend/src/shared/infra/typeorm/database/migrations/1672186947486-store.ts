import { MigrationInterface, QueryRunner } from 'typeorm';
import { AppDataSource } from '../../../../../data-source';
import Status from '../../../../../modules/stores/infra/typeorm/entities/Status';
import ContractType from '../../../../../modules/stores/infra/typeorm/entities/ContractType';
import User from '../../../../../modules/users/infra/typeorm/entities/User';

export class store1672186947486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Status)
      .values([
        {
          type: 'ACTIVE',
        },
        {
          type: 'DEACTIVE',
        },
        {
          type: 'PEDING_PAYMENT',
        },
      ])
      .execute();

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(ContractType)
      .values([
        {
          type: 'MONTHLY',
          value: 100.0,
        },
      ])
      .execute();

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
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(ContractType)
      .execute();
    await AppDataSource.createQueryBuilder().delete().from(Status).execute();
  }
}
