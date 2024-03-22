import { type ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject } from 'tsyringe';

class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
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
      throw new Error('Product already exists');
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
