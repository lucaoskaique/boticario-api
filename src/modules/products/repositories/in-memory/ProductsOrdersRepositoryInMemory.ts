import { type ICreateProductsOrdersDTO } from '@modules/products/dtos/ICreateProductsOrdersDTO';
import { ProductOrder } from '@modules/products/infra/typeorm/entities/ProductOrder';
import { v4 as uuid } from 'uuid';

import { type IProductsOrdersRepository } from '../IProductsOrdersRepository';

class ProductsOrdersRepositoryInMemory implements IProductsOrdersRepository {
  private productsOrders: ProductOrder[] = [];

  async create(data: ICreateProductsOrdersDTO): Promise<ProductOrder> {
    const productOrder = new ProductOrder();
    Object.assign(productOrder, {
      ...data,
      id: uuid(), // Assuming you have a uuid library imported
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.productsOrders.push(productOrder);

    return productOrder;
  }

  async findByOrderId(order_id: string): Promise<ProductOrder[]> {
    const productsOrders = this.productsOrders.filter(
      (productOrder) => productOrder.order_id === order_id,
    );

    return productsOrders;
  }

  async findById(id: string): Promise<ProductOrder | null> {
    const productOrder = this.productsOrders.find(
      (productOrder) => productOrder.id === id,
    );

    return productOrder ?? null;
  }

  async findByProductId(product_id: string): Promise<ProductOrder[] | null> {
    const productsOrders = this.productsOrders.filter(
      (productOrder) => productOrder.product_id === product_id,
    );

    return productsOrders.length ? productsOrders : null;
  }
}

export { ProductsOrdersRepositoryInMemory };
