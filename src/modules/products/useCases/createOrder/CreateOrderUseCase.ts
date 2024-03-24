/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { type Order } from '@modules/products/infra/typeorm/entities/Order';
import { type Product } from '@modules/products/infra/typeorm/entities/Product';
import { IOrdersRepository } from '@modules/products/repositories/IOrdersRepository';
import { IProductsOrdersRepository } from '@modules/products/repositories/IProductsOrdersRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IRequest {
  client_id: string;
  order_date: Date;
  products: Array<{
    product_id: string;
    product_price: number;
    quantity: number;
  }>;
}

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
    @inject('ProductsOrdersRepository')
    private productsOrdersRepository: IProductsOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    client_id,
    order_date,
    products,
  }: IRequest): Promise<Order | undefined> {
    const client = await this.clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    const productsByed: Product[] = [];
    let errorProduct: string | undefined;

    for (let i = 0; i < products.length; i++) {
      const product = await this.productsRepository.findById(
        products[i].product_id,
      );

      if (!product) {
        errorProduct = 'product id ' + products[i].product_id + ' not found';
        break;
      }

      if (product.inventory_count < products[i].quantity) {
        errorProduct =
          'product id ' + products[i].quantity + ' dont have enough stock';
        break;
      }

      productsByed.push(product);
    }

    if (errorProduct) {
      throw new AppError(errorProduct, 400);
    }

    // calcula o preço total do pedido
    let total_price = 0;
    for (let i = 0; i < productsByed.length; i++) {
      total_price +=
        Number(productsByed[i].price) * Number(products[i].quantity);
    }

    const year = new Date().getFullYear();
    const lastOrder = await this.ordersRepository.findLastOrderOfYear(year);
    let nextNumber = 1;

    if (lastOrder) {
      const lastNumber = parseInt(lastOrder.order_number.split('-')[1]);
      nextNumber = lastNumber + 1;
    }

    const formattedNumber = `${year}-${String(nextNumber).padStart(4, '0')}`;

    const newOrder = await this.ordersRepository.create({
      amount: Number(total_price.toFixed(2)),
      client_id,
      order_date,
      order_number: formattedNumber,
    });

    // add products to order and subtract from stock
    if (newOrder) {
      for (let i = 0; i < productsByed.length; i++) {
        const orderProduct = await this.productsOrdersRepository.create({
          product_id: productsByed[i].id,
          order_id: newOrder.id,
          product_count: products[i].quantity,
          product_price: Number(products[i].product_price),
        });

        await this.productsOrdersRepository.create(orderProduct);

        productsByed[i].inventory_count += products[i].quantity;

        await this.productsRepository.update(productsByed[i]);
      }
    }

    return newOrder;
  }
}

export { CreateOrderUseCase };
