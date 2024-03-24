import { AuthenticateClientController } from '@modules/clients/useCases/authenticateClient/AuthenticateClientController';
import { Router } from 'express';

const authenticateRoutes = Router();

const authenticateClientController = new AuthenticateClientController();

authenticateRoutes.post('/sessions', authenticateClientController.handle);

export { authenticateRoutes };
