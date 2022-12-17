import { AppDataSource } from '../../../../../data-source';
import { MigrationInterface, QueryRunner } from 'typeorm';
import ContractType from '../../../../../modules/stores/infra/typeorm/entities/ContractType';

export class store1671247962793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(ContractType)
      .execute();
  }
}
