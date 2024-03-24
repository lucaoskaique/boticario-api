import { type Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IUpdateClientImageDTO {
  product_id: string;
  image_file: string;
}

@injectable()
class UpdateProductImageUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    product_id,
    image_file,
  }: IUpdateClientImageDTO): Promise<Product> {
    const findProduct = await this.productsRepository.findById(product_id);

    if (!findProduct) {
      throw new Error('Product not found');
    }

    if (findProduct.image_url) {
      await this.storageProvider.deleteFile(findProduct.image_url);
    }

    const filename = await this.storageProvider.saveFile(image_file);
    console.log('ARQUIVO ===>', filename);
    findProduct.image_url = filename;

    await this.productsRepository.update(findProduct);

    return findProduct;
  }
}

export { UpdateProductImageUseCase };
