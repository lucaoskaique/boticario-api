import { type ICreateOrderDTO } from '../dtos/ICreateOrderDTO';
import { type Order } from '../infra/typeorm/entities/Order';

interface IOrdersRepository {
  findById: (id: string) => Promise<Order | null>;
  create: (data: ICreateOrderDTO) => Promise<void>;
  list: () => Promise<Order[]>;
}

export type { IOrdersRepository };
