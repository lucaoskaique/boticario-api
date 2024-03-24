import { type ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { type IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { type Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/data-source';

import { Product } from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.repository.findOne({ where: { name } });
    return product;
  }

  public async findById(id: string): Promise<Product | null> {
    const product = await this.repository.findOne({ where: { id } });
    return product;
  }

  public async list(): Promise<Product[]> {
    const products = await this.repository.find();
    return products;
  }

  public async create({
    name,
    description,
    price,
    inventory_count,
    category_id,
    image_url,
  }: ICreateProductDTO): Promise<void> {
    const product = this.repository.create({
      name,
      description,
      price,
      inventory_count,
      category_id,
      image_url,
    });

    await this.repository.save(product);
  }

  public async update(product: Product): Promise<void> {
    await this.repository.save(product);
  }
}

export { ProductsRepository };
