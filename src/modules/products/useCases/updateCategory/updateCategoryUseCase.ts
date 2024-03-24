import { ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IUpdateCategoryDTO {
  category_id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({
    category_id,
    name,
    description,
  }: IUpdateCategoryDTO): Promise<void> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const updatedCategory = {
      ...category,
      name,
      description,
    };

    await this.categoriesRepository.update(updatedCategory);
  }
}

export { UpdateCategoryUseCase };
