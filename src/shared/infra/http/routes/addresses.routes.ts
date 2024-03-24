import { CreateAddressController } from '@modules/clients/useCases/createAddress/CreateAddressController';
import { DeleteAddressController } from '@modules/clients/useCases/deleteAddress/deleteAdressController';
import { ListAddressController } from '@modules/clients/useCases/listAddress/ListAddressController';
import { UpdateAddressController } from '@modules/clients/useCases/updateAddress/UpdateAddressController';
import { Router } from 'express';

const addressesRoutes = Router();

const createAddressController = new CreateAddressController();
const listAddressController = new ListAddressController();
const deleteAddressController = new DeleteAddressController();
const updateAddressController = new UpdateAddressController();

addressesRoutes.post('/', createAddressController.handle);
addressesRoutes.get('/list', listAddressController.handle);
addressesRoutes.delete('/:id', deleteAddressController.handle);
addressesRoutes.patch('/:id', updateAddressController.handle);

export { addressesRoutes };
