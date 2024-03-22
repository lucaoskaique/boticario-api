import { type ICreateProductsOrdersDTO } from '../dtos/ICreateProductsOrdersDTO';
import { type ProductOrder } from '../infra/typeorm/entities/ProductOrder';

interface IProductsOrdersRepository {
  create: (data: ICreateProductsOrdersDTO) => Promise<ProductOrder>;
  findByOrderId: (order_id: string) => Promise<ProductOrder[]>;
  findById: (id: string) => Promise<ProductOrder | null>;
  findByProductId: (product_id: string) => Promise<ProductOrder[] | null>;
}

export type { IProductsOrdersRepository };
