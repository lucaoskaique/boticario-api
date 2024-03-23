import { CreateOrderController } from '@modules/products/useCases/createOrder/CreateOrderController';
import { Router } from 'express';

const ordersRoutes = Router();
const createOrderController = new CreateOrderController();

ordersRoutes.post('/', createOrderController.handle);

export { ordersRoutes };
