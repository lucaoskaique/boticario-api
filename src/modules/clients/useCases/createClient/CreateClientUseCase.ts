import { type ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { type Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IAddressesRepository } from '@modules/clients/repositories/IAddressesRepository';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({
    username,
    email,
    password,
    cpf,
    phone,
    birth_date,
    address_id,
  }: ICreateClientDTO): Promise<Client> {
    const clientAlreadyExists =
      await this.clientsRepository.findByUsername(username);

    if (clientAlreadyExists) {
      throw new AppError('Client already exists');
    }

    if (address_id) {
      const addressExists = await this.addressesRepository.findById(address_id);

      if (!addressExists) {
        throw new AppError('Address does not exist');
      }
    }

    const passwordHash = await hash(password, 8);

    const client = await this.clientsRepository.create({
      username,
      email,
      password: passwordHash,
      cpf,
      phone,
      birth_date,
      address_id,
    });

    return client;
  }
}

export { CreateClientUseCase };
