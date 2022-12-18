import ICreateProductsDTO from '@modules/products/dtos/ICreateProductsDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import Product from '../entities/Product';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  public async findAll(id_store: number): Promise<Product[]> {
    const products = await this.ormRepository.find({ where: { id_store } });

    return products;
  }
  public async findByMenuSection(id_menu_section: number): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: { id_menu_section },
    });

    return products;
  }
  public async findByNameAndIdStore(
    name: string,
    id_store: number,
  ): Promise<Product | null> {
    const product = await this.ormRepository.findOne({
      where: { name, id_store },
    });

    return product;
  }
  public async findById(id: number): Promise<Product | null> {
    const product = await this.ormRepository.findOne({
      where: { id },
    });

    return product;
  }
  public async create(data: ICreateProductsDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    return await this.ormRepository.save(product);
  }
  public async update(data: Product): Promise<Product | null> {
    return await this.ormRepository.save(data);
  }
  public async delete(id: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
