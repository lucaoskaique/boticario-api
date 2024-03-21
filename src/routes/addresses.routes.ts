import { CreateAddressController } from '@modules/clients/useCases/createAddress/CreateAddressController';
import { ListAddressController } from '@modules/clients/useCases/listAddress/ListAddressController';
import { Router } from 'express';

const addressesRoutes = Router();

const createAddressController = new CreateAddressController();
const listAddressController = new ListAddressController();

addressesRoutes.post('/', createAddressController.handle);
addressesRoutes.get('/list', listAddressController.handle);

export { addressesRoutes };
