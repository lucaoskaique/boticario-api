import { type ICreateOrderDTO } from '@modules/products/dtos/ICreateOrderDTO';
import { type IOrdersRepository } from '@modules/products/repositories/IOrdersRepository';
import { type Repository } from 'typeorm';
import { AppDataSource } from 'typeorm/data-source';

import { Order } from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = AppDataSource.getRepository(Order);
  }

  async create({
    amount,
    client_id,
    order_date,
    order_number,
    status,
  }: ICreateOrderDTO): Promise<void> {
    const order = this.repository.create({
      amount,
      client_id,
      order_date,
      order_number,
      status,
    });

    await this.repository.save(order);
  }

  async list(): Promise<Order[]> {
    const orders = await this.repository.find();
    return orders;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.repository.findOne({ where: { id } });
    return order;
  }
}

export { OrdersRepository };
