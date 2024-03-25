import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { DeleteClientController } from '@modules/clients/useCases/deleteClient/deleteClientController';
import { ListClientByIdController } from '@modules/clients/useCases/listClientById/ListClientByIdController';
import { ListClientsController } from '@modules/clients/useCases/listClients/ListClientsController';
import { UpdateClientController } from '@modules/clients/useCases/updateClient/UpdateClientController';
import { Router } from 'express';

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();
const listClientByIdController = new ListClientByIdController();
const deleteClientController = new DeleteClientController();
const updateClientController = new UpdateClientController();

clientsRoutes.post('/', createClientController.handle);
clientsRoutes.get('/list', listClientsController.handle);
clientsRoutes.get('/:id', listClientByIdController.handle);
clientsRoutes.delete('/:id', deleteClientController.handle);
clientsRoutes.patch('/:id', updateClientController.handle);

export { clientsRoutes };
