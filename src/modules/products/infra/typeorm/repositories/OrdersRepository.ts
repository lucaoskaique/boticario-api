import { type ICreateOrderDTO } from '@modules/products/dtos/ICreateOrderDTO';
import { type IOrdersRepository } from '@modules/products/repositories/IOrdersRepository';
import { Between, type Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/data-source';

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
  }: ICreateOrderDTO): Promise<Order | undefined> {
    let newOrder;
    await AppDataSource.transaction(async (transactionEntityManager) => {
      newOrder = transactionEntityManager.create(Order, {
        amount,
        client_id,
        order_date,
        order_number,
        status,
      });
      await transactionEntityManager.save(newOrder);
    });
    return newOrder;
  }

  async list(): Promise<Order[]> {
    const orders = await this.repository.find();
    return orders;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.repository.findOne({ where: { id } });
    return order;
  }

  async findLastOrderOfYear(year: number): Promise<Order | null> {
    const startDate = new Date(year, 0, 1); // Primeiro dia do ano
    const endDate = new Date(year + 1, 0, 1); // Primeiro dia do próximo ano

    const order = await this.repository.findOne({
      where: {
        order_date: Between(startDate, endDate),
      },
      order: {
        order_date: 'DESC',
      },
    });

    return order;
  }
}

export { OrdersRepository };
