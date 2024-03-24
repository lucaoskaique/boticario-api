import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    try {
      const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

      await deleteCategoryUseCase.execute(id);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).json({ errorMessage: error.message });
      }
    }

    return response.status(204).send();
  }
}

export { DeleteCategoryController };
