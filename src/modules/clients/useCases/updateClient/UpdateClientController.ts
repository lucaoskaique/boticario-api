import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { UpdateClientUseCase } from './UpdateClientUseCase';

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateClientBodySchema = z.object({
      name: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      birth_date: z.coerce.date().optional(),
      address_id: z.string().optional(),
    });

    const { name, email, phone, birth_date, address_id } =
      updateClientBodySchema.parse(request.body);

    const id = z.string().parse(request.params.id);
    let client;
    try {
      const updateClientUseCase = container.resolve(UpdateClientUseCase);

      client = await updateClientUseCase.execute({
        id,
        name,
        email,
        phone,
        birth_date,
        address_id,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
    }
    return response.json(client);
  }
}

export { UpdateClientController };
