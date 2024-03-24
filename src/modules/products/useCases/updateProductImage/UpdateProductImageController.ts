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

    const image = request.file?.filename!;

    const updateProductImageUseCase = container.resolve(
      UpdateProductImageUseCase,
    );

    await updateProductImageUseCase.execute({
      product_id: id,
      image_file: image,
    });

    return response.status(204).send();
  }
}

export { UpdateProductImageController };
