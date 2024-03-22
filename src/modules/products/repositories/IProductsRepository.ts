import { type ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { type Product } from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  findByName: (name: string) => Promise<Product | null>;
  findById: (id: string) => Promise<Product | null>;
  list: () => Promise<Product[]>;
  create: ({
    name,
    description,
    price,
    inventory_count,
    category_id,
    image_url,
  }: ICreateProductDTO) => Promise<void>;
}

export type { IProductsRepository };
