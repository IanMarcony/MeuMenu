import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import ListProductsService from '@modules/products/services/ListProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductsRepository from '../../typeorm/repositories/ProductsRepository';

export default class ProductsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, description, price, id_menu_section } = req.body;

    const { id: id_admin } = req.user;

    const product_filename = req.file?.filename;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      description,
      price,
      id_menu_section,
      id_admin,
      product_filename,
    });

    return res.status(201).json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, description, price, id_menu_section, id_product } = req.body;
    const { id: id_admin } = req.user;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      name,
      description,
      price,
      id_menu_section,
      id_product,
      id_admin,
    });

    return res.status(200).json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id: id_admin } = req.user;
    const { id_product } = req.body;

    const deletProduct = container.resolve(DeleteProductService);

    await deletProduct.execute({
      id_product,
      id_admin,
    });

    return res.status(204).json();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id: id_admin } = req.user;

    const listProducts = container.resolve(ListProductsService);

    const products = await listProducts.execute({ id_admin });

    return res.status(200).json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    let id = req.params.id as unknown as number;

    const repository = new ProductsRepository();

    const product = await repository.findById(id);

    return res.status(200).json(product ? product : {});
  }
}
