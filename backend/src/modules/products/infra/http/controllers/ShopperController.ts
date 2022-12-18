import ListProductsStoresService from '@modules/products/services/ListProductsStoresService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ShopperController {
  public async index(req: Request, res: Response): Promise<Response> {
    let { store } = req.params;

    const listProducts = container.resolve(ListProductsStoresService);

    const name_code_store = store ? (store as string) : '';

    const menuSections = await listProducts.execute({
      name_code_store,
    });

    return res.status(200).json(menuSections);
  }
}
