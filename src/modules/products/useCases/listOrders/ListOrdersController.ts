import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { ListOrdersUseCase } from './ListOrdersUseCase';

class ListOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { client_id } = z
      .object({
        client_id: z.string(),
      })
      .parse(request.params);

    const listOrdersUseCase = container.resolve(ListOrdersUseCase);

    const orders = await listOrdersUseCase.execute(client_id);

    return response.json(orders);
  }
}

export { ListOrdersController };
