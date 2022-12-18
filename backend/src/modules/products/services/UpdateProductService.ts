import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Product from '../infra/typeorm/entities/Product';
import IMenuSectionsRepository from '../repositories/IMenuSectionsRepository';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  price: number;
  id_menu_section: number;
  id_admin: number;
  id_product: number;
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('MenuSectionsRepository')
    private menuSectionsRepository: IMenuSectionsRepository,
  ) {}

  public async execute({
    name,
    description,
    id_menu_section,
    price,
    id_admin,
    id_product,
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

    const product = await this.productsRepository.findById(id_product);

    if (!product) {
      throw new AppError('Product not found');
    }

    product.name = name;
    product.description = description;
    product.price = price;

    await this.productsRepository.update(product);

    return product;
  }
}
