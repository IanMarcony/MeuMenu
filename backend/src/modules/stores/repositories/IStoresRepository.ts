import ICreateStoreDTO from '../dtos/ICreateStoreDTO';
import Store from '../infra/typeorm/entities/Store';

export default interface IStoresRepository {
  create(data: ICreateStoreDTO): Promise<Store>;
  findByName(name: string): Promise<Store | null>;
  findByIdAdmin(id_admin: number): Promise<Store | null>;
  update(store: Store): Promise<Store | null>;
  delete(id_store: number): Promise<void>;
}
