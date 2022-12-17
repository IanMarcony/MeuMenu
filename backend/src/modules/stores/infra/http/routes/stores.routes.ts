import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';
import StoresController from '../controllers/StoresController';
import StatusStoreController from '../controllers/StatusStoreController';
import ProfileBannerController from '../controllers/ProfileBannerController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const storesRouter = Router();

const upload = multer(uploadConfig);

const storesController = new StoresController();
const statusStoreController = new StatusStoreController();
const profileBannerController = new ProfileBannerController();

storesRouter.use(ensureAuthenticated);

storesRouter.post('/', upload.any(), storesController.create);
storesRouter.put('/', storesController.update);
storesRouter.delete('/', storesController.delete);

storesRouter.patch('/status', statusStoreController.update);

storesRouter.patch('/images', upload.any(), profileBannerController.update);

export default storesRouter;
