import { type ICreateCategoryDTO } from '@modules/products/dtos/ICreateCategoryDTO';
import { type ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { type Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/data-source';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.repository.findOne({ where: { id } });
    return category ?? null;
  }

  update: (category: Category) => Promise<void> = async (
    category: Category,
  ) => {
    await this.repository.save(category);
  };

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.repository.findOne({ where: { name } });

    return await category;
  }
}

export { CategoriesRepository };
