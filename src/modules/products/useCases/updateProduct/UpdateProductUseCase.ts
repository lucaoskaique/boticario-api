import { type Product } from '@modules/products/infra/typeorm/entities/Product';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IUpdateProductImageDTO {
  product_id: string;
  name: string;
  description: string;
  price: number;
  inventory_count: number;
  category_id: string;
}

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    product_id,
    category_id,
    description,
    name,
    price,
    inventory_count,
  }: IUpdateProductImageDTO): Promise<Product> {
    const findProduct = await this.productsRepository.findById(product_id);

    if (!findProduct) {
      throw new AppError('Product not found', 404);
    }

    const categoryExists =
      await this.categoriesRepository.findById(category_id);

    if (!categoryExists) {
      throw new AppError('Category not found', 404);
    }

    const serializedProduct = {
      ...findProduct,
      category_id,
      description,
      name,
      price,
      inventory_count,
    };

    await this.productsRepository.update(findProduct);

    return serializedProduct;
  }
}

export { UpdateProductUseCase };
