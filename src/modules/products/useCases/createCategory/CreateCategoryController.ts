import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCategoryBodySchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = createCategoryBodySchema.parse(request.body);

    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

      await createCategoryUseCase.execute({ name, description });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).json({ errorMessage: error.message });
      }
    }

    return response.status(201).send();
  }
}

export { CreateCategoryController };
