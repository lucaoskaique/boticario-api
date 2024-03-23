import { type Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IUpdateClientDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  birth_date: Date;
  address_id: string;
}

@injectable()
class UpdateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(client: IUpdateClientDTO): Promise<Client> {
    const findClient = await this.clientsRepository.findById(client.id);

    if (!findClient) {
      throw new AppError('Client not found');
    }

    return await this.clientsRepository.update({
      ...findClient,
      ...client,
    });
  }
}

export { UpdateClientUseCase };
