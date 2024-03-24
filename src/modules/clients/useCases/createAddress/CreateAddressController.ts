import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { CreateAddressUseCase } from './CreateAddressUseCase';

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createAddressBodySchema = z.object({
      cep: z.string(),
      street: z.string(),
      street_number: z.number(),
      complement: z.string(),
      neighborhood: z.string(),
      city: z.string(),
      uf: z.string(),
    });

    const { cep, city, complement, neighborhood, street, street_number, uf } =
      createAddressBodySchema.parse(request.body);

    let address = {};
    try {
      const createAddressUseCase = container.resolve(CreateAddressUseCase);

      address = await createAddressUseCase.execute({
        cep,
        city,
        complement,
        neighborhood,
        street,
        street_number,
        uf,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        return response.status(500).json({ errorMessage: error.message });
      }
    }
    return response.json(address);
  }
}

export { CreateAddressController };
