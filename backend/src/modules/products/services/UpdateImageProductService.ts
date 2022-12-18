import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id_product: number;
  product_filename: string;
  id_admin: number;
}

@injectable()
export default class UpdateImageProductService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    id_product,
    product_filename,
    id_admin,
  }: IRequest): Promise<Product> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Only authenticated users can verify store.', 401);
    }

    const product = await this.productsRepository.findById(id_product);

    if (!product) {
      throw new AppError('Product not found');
    }

    if (product.image_product_filename) {
      await this.storageProvider.deleteFile(product.image_product_filename);
    }

    const image_product_filename = await this.storageProvider.saveFile(
      product_filename,
    );

    product.image_product_filename = image_product_filename;

    await this.productsRepository.update(product);

    return product;
  }
}
