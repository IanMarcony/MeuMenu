import UpdateImageProductService from '@modules/products/services/UpdateImageProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProductImagesController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id_product } = req.body;
    const { id: id_admin } = req.user;
    const product_filename = req.file?.filename;

    const updateImageProduct = container.resolve(UpdateImageProductService);

    const product = await updateImageProduct.execute({
      id_product,
      product_filename,
      id_admin,
    });

    return res.status(200).json(product);
  }
}
