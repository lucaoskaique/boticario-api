import { ClientsRepository } from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import { type IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);
