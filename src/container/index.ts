import { AddressesRepository } from '@modules/clients/infra/typeorm/repositories/AddressesRepository';
import { ClientsRepository } from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import { type IAddressesRepository } from '@modules/clients/repositories/IAddressesRepository';
import { type IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { CategoriesRepository } from '@modules/products/infra/typeorm/repositories/CategoriesRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { type ICategoriesRepository } from '@modules/products/repositories/ICategoriesRepository';
import { type IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { container } from 'tsyringe';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
