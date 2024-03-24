import { CreateOrderController } from '@modules/products/useCases/createOrder/CreateOrderController';
import { ListOrderByIdController } from '@modules/products/useCases/listOrderById/ListOrderByIdController';
import { ListOrdersController } from '@modules/products/useCases/listOrders/ListOrdersController';
import { Router } from 'express';

const ordersRoutes = Router();
const createOrderController = new CreateOrderController();
const listOrderByIdController = new ListOrderByIdController();
const listOrdersController = new ListOrdersController();

ordersRoutes.post('/', createOrderController.handle);
ordersRoutes.get('/', listOrdersController.handle);
ordersRoutes.get('/:id', listOrderByIdController.handle);

export { ordersRoutes };
