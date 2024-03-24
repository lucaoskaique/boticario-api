import { type ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { type Client } from '../infra/typeorm/entities/Client';

interface IClientsRepository {
  create: (data: ICreateClientDTO) => Promise<Client>;
  findByUsername: (username: string) => Promise<Client | null>;
  findById: (id: string) => Promise<Client | null>;
  list: () => Promise<Client[]> | [];
  update: (data: Client) => Promise<Client>;
  delete: (id: string) => Promise<boolean>;
}

export type { IClientsRepository };
