import { CreateCategoryController } from '@modules/products/useCases/createCategory/CreateCategoryController';
import { ListCategoryController } from '@modules/products/useCases/listCategory/ListCategoryController';
import { Router } from 'express';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.get('/list', listCategoryController.handle);

export { categoriesRoutes };
