import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MenuSection from '../infra/typeorm/entities/MenuSection';
import IMenuSectionsRepository from '../repositories/IMenuSectionsRepository';

interface IRequest {
  name: string;
  id_admin: number;
}

@injectable()
export default class CreateMenuSectionService {
  constructor(
    @inject('StoreRepository')
    private storesRepository: IStoresRepository,
    @inject('MenuSectionsRepository')
    private menuSectionsRepository: IMenuSectionsRepository,
  ) {}

  public async execute({ name, id_admin }: IRequest): Promise<MenuSection> {
    const store = await this.storesRepository.findByIdAdmin(id_admin);

    if (!store) {
      throw new AppError('Only authenticated users can verify store.', 401);
    }

    const checkMenuSectionExists =
      await this.menuSectionsRepository.findByNameAndIdStore(name, store.id);

    if (checkMenuSectionExists) {
      throw new AppError('Menu Section already exists');
    }

    const menuSection = await this.menuSectionsRepository.create({
      name,
      id_store: store.id,
    });

    return menuSection;
  }
}
