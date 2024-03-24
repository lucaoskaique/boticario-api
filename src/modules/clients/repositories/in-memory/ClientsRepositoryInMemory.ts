import { type ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';

import { type IClientsRepository } from '../IClientsRepository';

class ClientsRepositoryInMemory implements IClientsRepository {
  private clients: Client[] = [];

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
    const client = new Client();
    Object.assign(client, {
      username,
      birth_date,
      cpf,
      email,
      password,
      phone,
      address_id,
      name,
    });
    this.clients.push(client);
    return client;
  }

  async findByUsername(username: string): Promise<Client | null> {
    const client = this.clients.find((client) => client.username === username);
    return client ?? null;
  }

  async findById(id: string): Promise<Client | null> {
    const client = this.clients.find((client) => client.id === id);
    return client ?? null;
  }

  async list(): Promise<Client[]> {
    return this.clients;
  }

  async update(data: Client): Promise<Client> {
    const index = this.clients.findIndex((client) => client.id === data.id);
    this.clients[index] = data;
    return data;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.clients.findIndex((client) => client.id === id);
    this.clients.splice(index, 1);
    return true;
  }
}

export { ClientsRepositoryInMemory };
