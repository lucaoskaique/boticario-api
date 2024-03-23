import { type ICreateProductsOrdersDTO } from '@modules/products/dtos/ICreateProductsOrdersDTO';
import { type IProductsOrdersRepository } from '@modules/products/repositories/IProductsOrdersRepository';
import { type Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/data-source';

import { ProductOrder } from '../entities/ProductOrder';

class ProductsOrdersRepository implements IProductsOrdersRepository {
  private repository: Repository<ProductOrder>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductOrder);
  }

  public async create({
    order_id,
    product_price,
    product_id,
    product_count,
  }: ICreateProductsOrdersDTO): Promise<ProductOrder> {
    const productOrder = this.repository.create({
      order_id,
      product_price,
      product_id,
      product_count,
    });

    await this.repository.save(productOrder);

    return productOrder;
  }

  public async findByOrderId(order_id: string): Promise<ProductOrder[]> {
    const productsOrders = await this.repository.find({
      where: { order_id },
    });

    return productsOrders;
  }

  public async findById(id: string): Promise<ProductOrder | null> {
    const productOrder = await this.repository.findOne({ where: { id } });

    return productOrder;
  }

  public async findByProductId(
    product_id: string,
  ): Promise<ProductOrder[] | null> {
    const productsOrders = await this.repository.find({
      where: { product_id },
    });

    return productsOrders;
  }
}

export { ProductsOrdersRepository };
