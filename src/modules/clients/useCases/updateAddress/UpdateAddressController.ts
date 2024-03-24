import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { UpdateAddressUseCase } from './UpdateAddressUseCase';

class UpdateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateAddressBodySchema = z.object({
      cep: z.string(),
      street: z.string(),
      street_number: z.number(),
      complement: z.string(),
      neighborhood: z.string(),
      city: z.string(),
      uf: z.string(),
    });

    const { cep, city, complement, neighborhood, street, street_number, uf } =
      updateAddressBodySchema.parse(request.body);

    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params);

    try {
      const updateAddressUseCase = container.resolve(UpdateAddressUseCase);
      await updateAddressUseCase.execute({
        id,
        street,
        street_number,
        city,
        uf,
        cep,
        complement,
        neighborhood,
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

export { UpdateAddressController };
