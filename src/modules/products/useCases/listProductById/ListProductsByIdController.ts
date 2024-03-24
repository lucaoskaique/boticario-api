import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { ListProductsByIdUseCase } from './ListProductsByIdUseCase';

class ListProductsByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    const listProductsByIdUseCase = container.resolve(ListProductsByIdUseCase);

    const products = await listProductsByIdUseCase.execute(id);

    return response.json(products);
  }
}

export { ListProductsByIdController };
