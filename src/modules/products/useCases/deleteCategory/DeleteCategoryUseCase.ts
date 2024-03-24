import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Category not found', 404);
    }

    await this.productsRepository.delete(id);
  }
}

export { DeleteCategoryUseCase };
