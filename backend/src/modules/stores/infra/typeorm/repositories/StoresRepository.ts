import ICreateStoreDTO from '@modules/stores/dtos/ICreateStoreDTO';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import Store from '../entities/Store';

export default class StoresRepository implements IStoresRepository {
  private ormRepository: Repository<Store>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Store);
  }

  public async create(data: ICreateStoreDTO): Promise<Store> {
    const store = this.ormRepository.create(data);
    await this.ormRepository.save(store);
    return store;
  }
  public async findByName(name: string): Promise<Store | null> {
    const store = await this.ormRepository.findOne({ where: { name } });
    return store;
  }
  public async findByIdAdmin(id_admin: number): Promise<Store | null> {
    const store = await this.ormRepository.findOne({ where: { id_admin } });
    return store;
  }
  public async update(store: Store): Promise<Store | null> {
    return await this.ormRepository.save(store);
  }
  public async delete(id_store: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id_store', { id_store })
      .execute();
  }
  public async updateStatus(name: string, id_status: number): Promise<void> {
    const store = await this.ormRepository.findOne({ where: { name } });
    if (store) {
      store.id_status = id_status;
    }
  }
}
