import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { DeleteAddressUseCase } from './deleteAdressUseCase';

class DeleteAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    try {
      const deleteAddressUseCase = container.resolve(DeleteAddressUseCase);

      await deleteAddressUseCase.execute(id);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(500).json({ errorMessage: error.message });
      }
    }

    return response.status(204).send();
  }
}

export { DeleteAddressController };
