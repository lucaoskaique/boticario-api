import { type ICreateOrderDTO } from '@modules/products/dtos/ICreateOrderDTO';
import { Order } from '@modules/products/infra/typeorm/entities/Order';

import { type IOrdersRepository } from '../IOrdersRepository';

class OrdersRepositoryInMemory implements IOrdersRepository {
  private orders: Order[] = [];

  async create(data: ICreateOrderDTO): Promise<Order | undefined> {
    const order = new Order();
    Object.assign(order, data);
    this.orders.push(order);
    return order;
  }

  async list(): Promise<Order[]> {
    return this.orders;
  }

  async findLastOrderOfYear(year: number): Promise<Order | null> {
    const startDate = new Date(year, 0, 1); // Primeiro dia do ano
    const endDate = new Date(year + 1, 0, 1); // Primeiro dia do próximo ano

    const orders = this.orders.filter((order) => {
      return order.order_date >= startDate && order.order_date < endDate;
    });

    if (orders.length === 0) {
      return null;
    }

    const lastOrder = orders.reduce((prev, current) => {
      return prev.order_date > current.order_date ? prev : current;
    });

    return lastOrder;
  }

  async findAndCount(id: string): Promise<[Order[], number]> {
    const orders = this.orders.filter((order) => order.id === id);
    return [orders, orders.length];
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find((order) => order.id === id);
    return order ?? null;
  }
}

export { OrdersRepositoryInMemory };
