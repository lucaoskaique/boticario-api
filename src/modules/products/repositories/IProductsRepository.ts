import { type ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { type Product } from '../infra/typeorm/entities/Product';

interface IListProductsDTO {
  category_id?: string | undefined;
  limit?: number | undefined;
  offset?: number | undefined;
}
interface IProductsRepository {
  findByName: (name: string) => Promise<Product | null>;
  findById: (id: string) => Promise<Product | null>;
  list: ({
    category_id,
    offset,
    limit,
  }: IListProductsDTO) => Promise<Product[]>;
  create: ({
    name,
    description,
    price,
    inventory_count,
    category_id,
    image_url,
  }: ICreateProductDTO) => Promise<void>;
  update: (product: Product) => Promise<void>;
  delete: (id: string) => Promise<void>;
  findAndCount: ({
    category_id,
    offset,
    limit,
  }: IListProductsDTO) => Promise<[Product[], number]>;
}

export type { IProductsRepository };
