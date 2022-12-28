import IStatusRepository from '@modules/stores/repositories/IStatusRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import Status from '../entities/Status';

export default class StatusRepository implements IStatusRepository {
  private ormRepository: Repository<Status>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Status);
  }

  public async findById(id: number): Promise<Status | null> {
    const status = await this.ormRepository.findOne({ where: { id } });
    return status;
  }
  public async findByType(type: string): Promise<Status | null> {
    const status = await this.ormRepository.findOne({ where: { type } });
    return status;
  }
}
