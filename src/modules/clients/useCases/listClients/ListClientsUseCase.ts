import { type Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListClientsUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.list();

    return clients;
  }
}

export { ListClientsUseCase };
