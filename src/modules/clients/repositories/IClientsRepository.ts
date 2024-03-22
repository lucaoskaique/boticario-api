import { type ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { type Client } from '../infra/typeorm/entities/Client';

interface IClientsRepository {
  create: (data: ICreateClientDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<Client | null>;
  findById: (id: string) => Promise<Client | null>;
  list: () => Promise<Client[]> | [];
  update: (data: Client) => Promise<Client>;
}

export type { IClientsRepository };
