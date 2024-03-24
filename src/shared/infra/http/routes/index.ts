import { Router } from 'express';

import { addressesRoutes } from './addresses.routes';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { clientsRoutes } from './clients.routes';
import { ordersRoutes } from './orders.routes';
import { productsRoutes } from './products.routes';

const routes = Router();

routes.use('/clients', clientsRoutes);
routes.use('/addresses', addressesRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);
routes.use(authenticateRoutes);

routes.use('/status', (request, response) => {
  response.json({
    message: 'server running',
  });
});

export { routes };
