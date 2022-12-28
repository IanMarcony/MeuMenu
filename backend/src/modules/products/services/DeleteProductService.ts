import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id_product: number;
  id_admin: number;
}

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ id_product, id_admin }: IRequest): Promise<void> {
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

    await this.productsRepository.delete(product.id);
  }
}
