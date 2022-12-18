import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMenuSectionsRepository from '../repositories/IMenuSectionsRepository';

interface IRequest {
  id_menu_section: number;
  id_admin: number;
}

@injectable()
export default class DeleteMenuSectionService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('MenuSectionsRepository')
    private menuSectionsRepository: IMenuSectionsRepository,
  ) {}

  public async execute({ id_menu_section, id_admin }: IRequest): Promise<void> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Only authenticated users can verify store.', 401);
    }

    const menuSection = await this.menuSectionsRepository.findById(
      id_menu_section,
    );

    if (!menuSection) {
      throw new AppError('Menu Section not found');
    }

    await this.menuSectionsRepository.delete(menuSection.id);
  }
}
