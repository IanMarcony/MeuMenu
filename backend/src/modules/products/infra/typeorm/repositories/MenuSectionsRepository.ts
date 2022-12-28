import ICreateMenuSectionDTO from '@modules/products/dtos/ICreateMenuSectionDTO';
import IMenuSectionsRepository from '@modules/products/repositories/IMenuSectionsRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import MenuSection from '../entities/MenuSection';

export default class MenuSectionsRepository implements IMenuSectionsRepository {
  private ormRepository: Repository<MenuSection>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(MenuSection);
  }

  public async create(data: ICreateMenuSectionDTO): Promise<MenuSection> {
    const menuSection = this.ormRepository.create(data);
    return await this.ormRepository.save(menuSection);
  }
  public async update(data: MenuSection): Promise<MenuSection | null> {
    return await this.ormRepository.save(data);
  }
  public async delete(id: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
  public async findAll(id_store: number): Promise<MenuSection[]> {
    const menuSections = await this.ormRepository.find({
      where: { id_store },
      relations: {
        products: true,
      },
    });

    return menuSections;
  }
  public async findById(id: number): Promise<MenuSection | null> {
    const menuSection = this.ormRepository.findOne({ where: { id } });

    return menuSection;
  }
  public async findByIdWithProducts(id: number): Promise<MenuSection | null> {
    const menuSection = this.ormRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });

    return menuSection;
  }
  public async findByNameAndIdStore(
    name: string,
    id_store: number,
  ): Promise<MenuSection | null> {
    const menuSection = this.ormRepository.findOne({
      where: { name, id_store },
    });

    return menuSection;
  }
}
