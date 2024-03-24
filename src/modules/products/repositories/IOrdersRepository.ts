import { type ICreateOrderDTO } from '../dtos/ICreateOrderDTO';
import { type Order } from '../infra/typeorm/entities/Order';

interface IOrdersRepository {
  findById: (id: string) => Promise<Order | null>;
  create: (data: ICreateOrderDTO) => Promise<Order | undefined>;
  list: () => Promise<Order[]>;
  findLastOrderOfYear: (year: number) => Promise<Order | null>;
  findAndCount: (id: string) => Promise<[Order[], number]>;
}

export type { IOrdersRepository };
