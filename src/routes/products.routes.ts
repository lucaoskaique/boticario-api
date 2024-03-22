import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController';
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController';
import { Router } from 'express';

const productsRoutes = Router();

const createProductController = new CreateProductController();

const listProductsController = new ListProductsController();

productsRoutes.post('/', createProductController.handle);
productsRoutes.get('/list', listProductsController.handle);

export { productsRoutes };
