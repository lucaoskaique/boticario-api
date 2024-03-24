import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { UpdateCategoryUseCase } from './updateCategoryUseCase';

class UpdateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateCategoryBodySchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = updateCategoryBodySchema.parse(request.body);

    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    try {
      const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);
      await updateCategoryUseCase.execute({
        category_id: id,
        name,
        description,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        return response.status(500).json({ errorMessage: error.message });
      }
    }
    return response.status(200).send();
  }
}

export { UpdateCategoryController };
