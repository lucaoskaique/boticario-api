import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateProductBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      quantity: z.number(),
      category_id: z.string(),
    });

    const { name, description, price, quantity, category_id } =
      updateProductBodySchema.parse(request.body);

    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    try {
      const updateProductUseCase = container.resolve(UpdateProductUseCase);
      await updateProductUseCase.execute({
        product_id: id,
        name,
        description,
        price,
        inventory_count: quantity,
        category_id,
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

export { UpdateProductController };
