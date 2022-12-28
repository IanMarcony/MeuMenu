import { Router } from 'express';
import ShopperController from '../controllers/ShopperController';

const shoppersRouter = Router();

const shopperController = new ShopperController();

shoppersRouter.get('/:store', shopperController.index);

export default shoppersRouter;
