/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Order } from '@modules/products/infra/typeorm/entities/Order';
import { IOrdersRepository } from '@modules/products/repositories/IOrdersRepository';
import { inject, injectable } from 'tsyringe';

type IAny = Record<string, any>;

interface IResponse {
  orders: Order[];
  count: number;
}
@injectable()
class ListOrdersUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  async execute(client_id: string): Promise<IResponse> {
    const [orders, count] = await this.ordersRepository.findAndCount(client_id);

    const serializedOrders = orders.map((order) => {
      const products = order?.productOrders?.map((productOrder) => {
        const productCopy: IAny = { ...productOrder.product };

        const productOrderCopy = { ...productOrder };
        delete productOrderCopy.product;

        productCopy.product_orders = productOrderCopy;

        return productCopy;
      });

      const orderCopy: IAny = { ...order };
      delete orderCopy.productOrders;
      orderCopy.products = products;

      orderCopy.createdAt = orderCopy.created_at;
      delete orderCopy.created_at;

      return orderCopy;
    });

    return {
      orders: serializedOrders as Order[],
      count,
    };
  }
}

export { ListOrdersUseCase };
