import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { CreateProductUseCase } from './CreateProductUseCase';
class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createProductBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      category_id: z.string(),
      image_url: z.string(),
      inventory_count: z.number(),
    });

    const {
      name,
      description,
      price,
      category_id,
      image_url,
      inventory_count,
    } = createProductBodySchema.parse(request.body);

    try {
      const createProductUseCase = container.resolve(CreateProductUseCase);

      await createProductUseCase.execute({
        name,
        description,
        price,
        category_id,
        image_url,
        inventory_count,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).json({ errorMessage: error.message });
      }
    }

    return response.status(201).send();
  }
}

export { CreateProductController };
