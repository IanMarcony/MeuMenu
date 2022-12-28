import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ProductsController from '../controllers/ProductsController';
import ProductImagesController from '../controllers/ProductImagesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsPriceController from '../controllers/ProductsPriceController';

const productsRouter = Router();
const upload = multer(uploadConfig);

const productsController = new ProductsController();
const productImagesController = new ProductImagesController();
const productsPriceController = new ProductsPriceController();

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', upload.single('image'), productsController.create);
productsRouter.put('/', productsController.update);
productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.delete('/', productsController.delete);
productsRouter.patch(
  '/images',
  upload.single('image'),
  productImagesController.update,
);
productsRouter.patch('/price', productsPriceController.update);

export default productsRouter;
