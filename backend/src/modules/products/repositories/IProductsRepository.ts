import ICreateProductsDTO from '../dtos/ICreateProductsDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  findAll(id_store: number): Promise<Product[]>;
  findByMenuSection(id_menu_section: number): Promise<Product[]>;
  findByNameAndIdStore(name: string, id_store: number): Promise<Product | null>;
  findById(id: number): Promise<Product | null>;
  create(data: ICreateProductsDTO): Promise<Product>;
  update(data: Product): Promise<Product | null>;
  delete(id: number): Promise<void>;
}
