import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { CreateOrderUseCase } from './CreateOrderUseCase';
class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createOrderBodySchema = z.object({
      client_id: z.string(),
      amount: z.number(),
      order_date: z.date(),
      products: z.array(
        z.object({
          product_id: z.string(),
          quantity: z.number(),
          product_price: z.number(),
        }),
      ),
    });
    const { client_id, order_date, products } = createOrderBodySchema.parse(
      request.body,
    );

    try {
      const createOrderUseCase = container.resolve(CreateOrderUseCase);
      await createOrderUseCase.execute({
        client_id,
        order_date,
        products,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).json({ errorMessage: error.message });
      }
    }
    return response.status(201).send();
  }
}

export { CreateOrderController };
