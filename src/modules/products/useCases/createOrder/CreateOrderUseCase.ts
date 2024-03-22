import { type ICreateOrderDTO } from '@modules/products/dtos/ICreateOrderDTO';
import { IOrdersRepository } from '@modules/products/repositories/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute({
    amount,
    client_id,
    order_date,
    order_number,
    status,
  }: ICreateOrderDTO): Promise<void> {
    await this.ordersRepository.create({
      amount,
      client_id,
      order_date,
      order_number,
      status,
    });
  }
}

export { CreateOrderUseCase };
