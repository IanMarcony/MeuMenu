import ICreateMenuSectionDTO from '../dtos/ICreateMenuSectionDTO';
import MenuSection from '../infra/typeorm/entities/MenuSection';

export default interface IMenuSectionsRepository {
  create(data: ICreateMenuSectionDTO): Promise<MenuSection>;
  update(data: MenuSection): Promise<MenuSection | null>;
  delete(id: number): Promise<void>;
  findAll(id_store: number): Promise<MenuSection[]>;
  findById(id: number): Promise<MenuSection | null>;
  findByIdWithProducts(id: number): Promise<MenuSection | null>;
  findByNameAndIdStore(
    name: string,
    id_store: number,
  ): Promise<MenuSection | null>;
}
