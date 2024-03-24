import { type OrderStatus } from '../infra/typeorm/entities/Order';

interface ICreateOrderDTO {
  amount: number;
  order_date: Date;
  status?: OrderStatus;
  client_id: string;
  order_number?: string;
}

export type { ICreateOrderDTO };
