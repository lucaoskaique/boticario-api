/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { UpdateProductImageUseCase } from './UpdateProductImageUseCase';

class UpdateProductImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    console.log('ID ===>', id);

    const image = request.file;

    if (!image) return response.status(400).json({ message: 'no image' });

    const updateProductImageUseCase = container.resolve(
      UpdateProductImageUseCase,
    );

    await updateProductImageUseCase.execute({
      product_id: id,
      image_file: image.filename,
    });

    return response.status(204).send(image);
  }
}

export { UpdateProductImageController };
