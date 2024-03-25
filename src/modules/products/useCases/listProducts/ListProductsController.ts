import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const limit = request.query.limit ? Number(request.query.limit) : undefined;
    const offset = request.query.offset
      ? Number(request.query.offset)
      : undefined;

    let products;
    try {
      const listProductsUseCase = container.resolve(ListProductsUseCase);

      products = await listProductsUseCase.execute({
        limit,
        offset,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(400).json({ error: error.message });
      }
    }
    return response.json(products);
  }
}

export { ListProductsController };
