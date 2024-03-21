import { type ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { type IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { type Repository } from 'typeorm';
import { AppDataSource } from 'typeorm/data-source';

import { Client } from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private readonly repository: Repository<Client>;

  constructor() {
    this.repository = AppDataSource.getRepository(Client);
  }

  async create({
    username,
    birth_date,
    cpf,
    email,
    password,
    phone,
    address_id,
  }: ICreateClientDTO): Promise<void> {
    const client = this.repository.create({
      username,
      birth_date,
      cpf,
      email,
      password,
      phone,
      address_id,
    });

    await this.repository.save(client);
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await this.repository.findOneBy({ email });

    return client;
  }

  async findById(id: string): Promise<Client | null> {
    const client = await this.repository.findOne({ where: { id } });

    return client;
  }

  async list(): Promise<Client[]> {
    return await this.repository.find();
  }
}

export { ClientsRepository };
