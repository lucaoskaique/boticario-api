import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const category_id = request.query.category_id
      ? String(request.query.category_id)
      : undefined;

    const limit = request.query.limit ? Number(request.query.limit) : undefined;
    const offset = request.query.offset
      ? Number(request.query.offset)
      : undefined;

    const listProductsUseCase = container.resolve(ListProductsUseCase);

    const products = await listProductsUseCase.execute({
      category_id,
      limit,
      offset,
    });

    return response.json(products);
  }
}

export { ListProductsController };
