import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MenuSection from '../infra/typeorm/entities/MenuSection';
import IMenuSectionsRepository from '../repositories/IMenuSectionsRepository';

interface IRequest {
  name: string;
  id_admin: number;
  id_menu_section: number;
}

@injectable()
export default class UpdateMenuSectionService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('MenuSectionsRepository')
    private menuSectionsRepository: IMenuSectionsRepository,
  ) {}

  public async execute({
    name,
    id_admin,
    id_menu_section,
  }: IRequest): Promise<MenuSection> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Only authenticated users can verify store.', 401);
    }

    const checkMenuSectionExists =
      await this.menuSectionsRepository.findByNameAndIdStore(name, store.id);

    if (checkMenuSectionExists) {
      throw new AppError('Menu Section already exists with same name');
    }

    const menuSection = await this.menuSectionsRepository.findById(
      id_menu_section,
    );

    if (!menuSection) {
      throw new AppError('Menu Section not found');
    }

    menuSection.name = name;

    await this.menuSectionsRepository.update(menuSection);

    return menuSection;
  }
}
