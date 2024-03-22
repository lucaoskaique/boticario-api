import { AppError } from '@errors/AppError';
import { type ICreateCategoryDTO } from '@modules/products/dtos/ICreateCategoryDTO';
import { type ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ description, name }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists =
      await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
