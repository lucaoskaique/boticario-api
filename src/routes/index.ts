import { Router } from 'express';

import { addressesRoutes } from './addresses.routes';
import { clientsRoutes } from './clients.routes';

const routes = Router();

routes.use('/clients', clientsRoutes);
routes.use('/addresses', addressesRoutes);
routes.use('/status', (request, response) => {
  response.json({
    message: 'server running',
  });
});

export { routes };
