import { type Order } from '@modules/products/infra/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/products/repositories/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class ListOrderByIdUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export { ListOrderByIdUseCase };
