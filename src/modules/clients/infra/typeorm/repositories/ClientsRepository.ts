import { type ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { type IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { type Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/data-source';

import { Client } from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private readonly repository: Repository<Client>;

  constructor() {
    this.repository = AppDataSource.getRepository(Client);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.repository.delete(id);
    return deleted.affected === 1;
  }

  async create({
    username,
    birth_date,
    cpf,
    email,
    password,
    phone,
    address_id,
    name,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.repository.create({
      username,
      birth_date,
      cpf,
      email,
      password,
      phone,
      address_id,
      name,
    });

    await this.repository.save(client);

    return client;
  }

  async findByUsername(username: string): Promise<Client | null> {
    const client = await this.repository.findOneBy({ username });

    return client;
  }

  async findById(id: string): Promise<Client | null> {
    const client = await this.repository.findOne({
      where: { id },
    });

    return client;
  }

  async list(): Promise<Client[]> {
    return await this.repository.find();
  }

  async update(client: Client): Promise<Client> {
    await this.repository.save(client);

    return client;
  }
}

export { ClientsRepository };
