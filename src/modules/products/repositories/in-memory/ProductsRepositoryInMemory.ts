import { type ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { Product } from '@modules/products/infra/typeorm/entities/Product';

import { type IProductsRepository } from '../IProductsRepository';

class ProductsRepositoryInMemory implements IProductsRepository {
  private products: Product[] = [];

  async create({ name, price }: ICreateProductDTO): Promise<void> {
    const product = new Product();

    Object.assign(product, {
      name,
      price,
      created_at: new Date(),
    });

    this.products.push(product);
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find((product) => product.name === name);

    return product ?? null;
  }

  async list(): Promise<Product[]> {
    return this.products;
  }

  async delete(id: string): Promise<void> {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    this.products.splice(productIndex, 1);
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);

    return product ?? null;
  }

  async update(product: Product): Promise<void> {
    const productIndex = this.products.findIndex(
      (item) => item.id === product.id,
    );

    this.products[productIndex] = product;
  }

  async findAndCount(): Promise<[Product[], number]> {
    return [this.products, this.products.length];
  }
}

export { ProductsRepositoryInMemory };
