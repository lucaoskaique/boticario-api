import { type Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListProductsByIdUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(id: string): Promise<Product> {
    const products = await this.productsRepository.findById(id);

    if (!products) {
      throw new Error('Product not found');
    }

    return products;
  }
}

export { ListProductsByIdUseCase };
