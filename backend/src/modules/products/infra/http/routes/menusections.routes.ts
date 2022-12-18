import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import MenuSectionsController from '../controllers/MenuSectionsController';

const menusectionsRouter = Router();

const menuSectionsController = new MenuSectionsController();

menusectionsRouter.use(ensureAuthenticated);

menusectionsRouter.post('/', menuSectionsController.create);
menusectionsRouter.get('/', menuSectionsController.index);
menusectionsRouter.get('/:id', menuSectionsController.show);
menusectionsRouter.put('/', menuSectionsController.update);
menusectionsRouter.delete('/', menuSectionsController.delete);

export default menusectionsRouter;
