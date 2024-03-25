import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { AppError } from '@shared/errors/AppError';

import { ListOrderByIdUseCase } from './ListOrderByIdUsecase';

class ListOrderByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    let order;
    try {
      const listOrderByIdUseCase = container.resolve(ListOrderByIdUseCase);

      order = await listOrderByIdUseCase.execute(id);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(400).json({ error: error.message });
      }
    }
    return response.json(order);
  }
}

export { ListOrderByIdController };
