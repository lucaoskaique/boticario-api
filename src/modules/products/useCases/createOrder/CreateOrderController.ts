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
      status: z.string(),
    });
    const { client_id, amount, order_date, status } =
      createOrderBodySchema.parse(request.body);

    try {
      const createOrderUseCase = container.resolve(CreateOrderUseCase);
      await createOrderUseCase.execute({
        client_id,
        amount,
        order_date,
        status,
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
