import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { ListCategoryByIdUseCase } from './ListCategoryByIdUseCase';

class ListProductsByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    const listCategoryByIdUseCase = container.resolve(ListCategoryByIdUseCase);

    const category = await listCategoryByIdUseCase.execute(id);

    return response.json(category);
  }
}

export { ListProductsByIdController };
