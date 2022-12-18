import UpdatePriceProductService from '@modules/products/services/UpdatePriceProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductsPriceController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { price, id_product } = req.body;
    const { id: id_admin } = req.user;

    const updatePriceProduct = container.resolve(UpdatePriceProductService);

    const product = await updatePriceProduct.execute({
      price,
      id_product,
      id_admin,
    });

    return res.status(200).json(product);
  }
}
