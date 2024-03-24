import uploadConfig from '@config/upload';
import { CreateProductController } from '@modules/products/useCases/createProduct/CreateProductController';
import { DeleteProductController } from '@modules/products/useCases/deleteProduct/DeleteProductController';
import { ListProductsByIdController } from '@modules/products/useCases/listProductById/ListProductsByIdController';
import { ListProductsController } from '@modules/products/useCases/listProducts/ListProductsController';
import { UpdateProductController } from '@modules/products/useCases/updateProduct/UpdateProductController';
import { UpdateProductImageController } from '@modules/products/useCases/updateProductImage/UpdateProductImageController';
import { Router } from 'express';
import multer from 'multer';

const upload = multer(uploadConfig.multer);

const productsRoutes = Router();

const createProductController = new CreateProductController();

const listProductsController = new ListProductsController();

const updateProductController = new UpdateProductController();

const deleteProductController = new DeleteProductController();

const updateProductImageController = new UpdateProductImageController();

const listProductsByIdController = new ListProductsByIdController();

productsRoutes.post('/', createProductController.handle);
productsRoutes.get('/:id', listProductsByIdController.handle);
productsRoutes.get('/list', listProductsController.handle);
productsRoutes.patch('/:id', updateProductController.handle);
productsRoutes.delete('/:id', deleteProductController.handle);
productsRoutes.patch(
  '/image',
  upload.single('avatar'),
  updateProductImageController.handle,
);

export { productsRoutes };
