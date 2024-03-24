import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { DeleteClientController } from '@modules/clients/useCases/deleteClient/deleteClientController';
import { ListClientsController } from '@modules/clients/useCases/listClients/ListClientsController';
import { UpdateClientController } from '@modules/clients/useCases/updateClient/UpdateClientController';
import { Router } from 'express';

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();
const deleteClientController = new DeleteClientController();
const updateClientController = new UpdateClientController();

clientsRoutes.post('/', createClientController.handle);
clientsRoutes.get('/list', listClientsController.handle);
clientsRoutes.delete('/:id', deleteClientController.handle);
clientsRoutes.patch('/:id', updateClientController.handle);

export { clientsRoutes };
