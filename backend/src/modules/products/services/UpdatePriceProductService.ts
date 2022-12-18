import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  price: number;
  id_admin: number;
  id_product: number;
}

@injectable()
export default class UpdatePriceProductService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    price,
    id_admin,
    id_product,
  }: IRequest): Promise<Product> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Only authenticated users can verify store.', 401);
    }

    const product = await this.productsRepository.findById(id_product);

    if (!product) {
      throw new AppError('Product not found');
    }

    product.price = price;

    await this.productsRepository.update(product);

    return product;
  }
}
