import { type Order } from '@modules/products/infra/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/products/repositories/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListOrdersUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(): Promise<Order[]> {
    const orders = await this.ordersRepository.list();

    return orders;
  }
}

export { ListOrdersUseCase };
