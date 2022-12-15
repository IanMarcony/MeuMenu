import { MigrationInterface, QueryRunner } from 'typeorm';
import { AppDataSource } from '../../../../../data-source';
import Status from '../../../../../modules/stores/infra/typeorm/entities/Status';

export class store1670988020240 implements MigrationInterface {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder().delete().from(Status).execute();
  }
}
