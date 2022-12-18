import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MenuSection from '../infra/typeorm/entities/MenuSection';
import Product from '../infra/typeorm/entities/Product';
import IMenuSectionsRepository from '../repositories/IMenuSectionsRepository';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id_admin: number;
}

@injectable()
export default class ListProductsService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id_admin }: IRequest): Promise<Product[]> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Store not found');
    }

    const products = await this.productsRepository.findAll(store.id);

    return products;
  }
}
