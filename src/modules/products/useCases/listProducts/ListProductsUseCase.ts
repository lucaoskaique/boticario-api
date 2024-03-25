import { type Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
interface IResponse {
  products: Product[];
  count: number;
}
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

  async execute({ limit, offset }: IRequest): Promise<IResponse> {
    const [products, count] = await this.productsRepository.findAndCount({
      limit,
      offset,
    });

    return { count, products };
  }
}

export { ListProductsUseCase };
