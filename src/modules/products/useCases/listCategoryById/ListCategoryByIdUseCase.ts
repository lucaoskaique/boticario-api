import { type Category } from '@modules/products/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class ListCategoryByIdUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found');
    }

    return category;
  }
}

export { ListCategoryByIdUseCase };
