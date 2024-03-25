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

addressesRoutes.post(
  '/' /*  #swagger.auto = false

  #swagger.path = '/addresses/{id}'
  #swagger.method = 'post'
  #swagger.produces = ['application/json']
  #swagger.consumes = ['application/json']

  #swagger.parameters['body'] = {
      in: 'body',
      description: 'Address data.',
      required: true,
      schema: {
          name: "Address Name",
          description: "Description of Address",
      }
  }
*/,
  createAddressController.handle,
);
addressesRoutes.get(
  '/list', // #swagger.tags = ['Addresses']
  listAddressController.handle,
);
addressesRoutes.delete(
  '/:id', // #swagger.tags = ['Addresses']
  deleteAddressController.handle,
);
addressesRoutes.patch(
  '/:id', // #swagger.tags = ['Addresses']
  updateAddressController.handle,
);

export { addressesRoutes };
