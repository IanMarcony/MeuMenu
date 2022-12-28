import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MenuSection from '../infra/typeorm/entities/MenuSection';
import IMenuSectionsRepository from '../repositories/IMenuSectionsRepository';

interface IRequest {
  id_admin: number;
}

@injectable()
export default class ListMenuSectionService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('MenuSectionsRepository')
    private menuSectionsRepository: IMenuSectionsRepository,
  ) {}

  public async execute({ id_admin }: IRequest): Promise<MenuSection[]> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Store not found');
    }

    const menuSections = await this.menuSectionsRepository.findAll(store.id);

    return menuSections;
  }
}
