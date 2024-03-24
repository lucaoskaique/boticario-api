import { type ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    name,
    description,
    price,
    inventory_count,
    category_id,
    image_url,
  }: ICreateProductDTO): Promise<void> {
    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists) {
      throw new AppError('Product already exists');
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category does not exist');
    }

    await this.productsRepository.create({
      name,
      description,
      price,
      inventory_count,
      category_id,
      image_url,
    });
  }
}

export { CreateProductUseCase };
