import { Router } from 'express';

import { clientsRoutes } from './clients.routes';

const routes = Router();

routes.use('/clients', clientsRoutes);

routes.use('/status', (request, response) => {
  response.json({
    message: 'server running',
  });
});

export { routes };
