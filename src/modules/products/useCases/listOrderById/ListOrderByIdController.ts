import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { ListOrderByIdUseCase } from './ListOrderByIdUsecase';

class ListOrderByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    const listOrderByIdUseCase = container.resolve(ListOrderByIdUseCase);

    const order = await listOrderByIdUseCase.execute(id);

    return response.json(order);
  }
}

export { ListOrderByIdController };
