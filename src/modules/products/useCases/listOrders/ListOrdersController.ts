import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { AppError } from '@shared/errors/AppError';

import { ListOrdersUseCase } from './ListOrdersUseCase';

class ListOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { client_id } = z
      .object({
        client_id: z.string(),
      })
      .parse(request.params);
    let orders;
    try {
      const listOrdersUseCase = container.resolve(ListOrdersUseCase);

      orders = await listOrdersUseCase.execute(client_id);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(400).json({ error: error.message });
      }
    }
    return response.json(orders);
  }
}

export { ListOrdersController };
