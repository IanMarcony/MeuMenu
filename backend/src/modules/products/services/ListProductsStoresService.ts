import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import Constants from '@shared/utils/Constants';
import { inject, injectable } from 'tsyringe';
import MenuSection from '../infra/typeorm/entities/MenuSection';
import IMenuSectionsRepository from '../repositories/IMenuSectionsRepository';

interface IRequest {
  name_code_store: string;
}

@injectable()
export default class ListProductsStoresService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('MenuSectionsRepository')
    private menuSectionsRepository: IMenuSectionsRepository,
  ) {}

  public async execute({ name_code_store }: IRequest): Promise<MenuSection[]> {
    const store = await this.storesRepository.findByNameCode(name_code_store);

    if (!store) {
      throw new AppError('Store not found');
    }

    if (store.status_id !== Constants.StatusTypeID.ACTIVE) {
      throw new AppError('Store temporaly unavailable');
    }

    const menuSections = await this.menuSectionsRepository.findAll(store.id);

    return menuSections;
  }
}
