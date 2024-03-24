import { type Product } from '@modules/products/infra/typeorm/entities/Product';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  category_id?: string;
  limit?: number;
  offset?: number;
}
@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({ category_id, limit, offset }: IRequest): Promise<Product[]> {
    const products = await this.productsRepository.list({
      category_id,
      limit,
      offset,
    });

    return products;
  }
}

export { ListProductsUseCase };
