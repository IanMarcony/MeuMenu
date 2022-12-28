import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import storesRouter from '@modules/stores/infra/http/routes/stores.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import menusectionsRouter from '@modules/products/infra/http/routes/menusections.routes';
import shoppersRouter from '@modules/products/infra/http/routes/shoppers.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/stores', storesRouter);
routes.use('/products', productsRouter);
routes.use('/menusections', menusectionsRouter);
routes.use('/shoppers', shoppersRouter);

export default routes;
