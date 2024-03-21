import { AddressesRepository } from '@modules/clients/infra/typeorm/repositories/AddressesRepository';
import { ClientsRepository } from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import { type IAddressesRepository } from '@modules/clients/repositories/IAddressesRepository';
import { type IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);
