import { CreateCategoryController } from '@modules/products/useCases/createCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/products/useCases/deleteCategory/DeleteCategoryController';
import { ListCategoryController } from '@modules/products/useCases/listCategories/ListCategoryController';
import { ListCategoryByIdController } from '@modules/products/useCases/listCategoryById/ListCategoryByIdController';
import { UpdateCategoryController } from '@modules/products/useCases/updateCategory/updateCategoryController';
import { Router } from 'express';

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const listCategoryByIdController = new ListCategoryByIdController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);
categoriesRoutes.get('/list', listCategoryController.handle);
categoriesRoutes.get('/:id', listCategoryByIdController.handle);
categoriesRoutes.delete('/:id', deleteCategoryController.handle);
categoriesRoutes.patch('/:id', updateCategoryController.handle);

export { categoriesRoutes };
