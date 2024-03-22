import { type ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { type Category } from '../infra/typeorm/entities/Category';

interface ICategoriesRepository {
  findByName: (name: string) => Promise<Category | null>;
  list: () => Promise<Category[]>;
  create: ({ name, description }: ICreateCategoryDTO) => Promise<void>;
}

export type { ICategoriesRepository };
