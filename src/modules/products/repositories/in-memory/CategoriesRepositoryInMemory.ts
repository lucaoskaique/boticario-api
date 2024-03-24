import { type ICreateCategoryDTO } from '@modules/products/dtos/ICreateCategoryDTO';
import { Category } from '@modules/products/infra/typeorm/entities/Category';

import { type ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.id === id);
    return category ?? null;
  }

  async update(category: Category): Promise<void> {
    const index = this.categories.findIndex((c) => c.id === category.id);

    if (index !== -1) {
      this.categories[index] = category;
    }
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name);
    return category ?? null;
  }
}

export { CategoriesRepositoryInMemory };
