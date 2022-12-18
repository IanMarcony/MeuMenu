import CreateMenuSectionService from '@modules/products/services/CreateMenuSectionService';
import DeleteMenuSectionService from '@modules/products/services/DeleteMenuSectionService';
import ListMenuSectionService from '@modules/products/services/ListMenuSectionService';
import UpdateMenuSectionService from '@modules/products/services/UpdateMenuSectionService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import MenuSectionsRepository from '../../typeorm/repositories/MenuSectionsRepository';

export default class MenuSectionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const { id: id_admin } = req.user;

    const createMenuSection = container.resolve(CreateMenuSectionService);

    const product = await createMenuSection.execute({
      name,
      id_admin,
    });

    return res.status(201).json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, id_menu_section } = req.body;
    const { id: id_admin } = req.user;

    const updateMenuSection = container.resolve(UpdateMenuSectionService);

    const menuSection = await updateMenuSection.execute({
      name,
      id_menu_section,
      id_admin,
    });

    return res.status(200).json(menuSection);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: id_admin } = req.user;
    const { id_menu_section } = req.body;

    const deleteMenuSection = container.resolve(DeleteMenuSectionService);

    await deleteMenuSection.execute({
      id_menu_section,
      id_admin,
    });

    return res.status(204).json();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id: id_admin } = req.user;

    const listMenuSection = container.resolve(ListMenuSectionService);

    const products = await listMenuSection.execute({ id_admin });

    return res.status(200).json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    let id = req.params.id as unknown as number;

    const repository = new MenuSectionsRepository();

    const menuSection = await repository.findByIdWithProducts(id);

    return res.status(200).json(menuSection ? menuSection : {});
  }
}
