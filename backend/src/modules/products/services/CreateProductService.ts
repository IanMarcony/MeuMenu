import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/interfaces/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IMenuSectionsRepository from '../repositories/IMenuSectionsRepository';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
  product_filename: string;
  id_menu_section: number;
  id_admin: number;
}

@injectable()
export default class CreateProductService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('MenuSectionsRepository')
    private menuSectionsRepository: IMenuSectionsRepository,
  ) {}

  public async execute({
    name,
    description,
    id_menu_section,
    product_filename,
    price,
    id_admin,
  }: IRequest): Promise<Product> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Only authenticated users can verify store.', 401);
    }

    const checkMenuSectionExists = await this.menuSectionsRepository.findById(
      id_menu_section,
    );

    if (!checkMenuSectionExists) {
      throw new AppError('Menu Section selected does not exist');
    }

    const checkProductExists =
      await this.productsRepository.findByNameAndIdStore(name, store.id);

    if (checkProductExists) {
      throw new AppError('Product already exists');
    }

    const image_product_filename = await this.storageProvider.saveFile(
      product_filename,
    );

    const product = await this.productsRepository.create({
      name,
      description,
      id_menu_section,
      id_store: store.id,
      image_product_filename,
      price,
    });

    return product;
  }
}
