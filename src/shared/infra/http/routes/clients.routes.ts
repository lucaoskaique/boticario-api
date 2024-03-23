import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { ListClientsController } from '@modules/clients/useCases/listClients/ListClientsController';
import { Router } from 'express';

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();

clientsRoutes.post('/', createClientController.handle);
clientsRoutes.get('/list', listClientsController.handle);

export { clientsRoutes };
