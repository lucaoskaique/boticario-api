import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { UpdateClientUseCase } from './UpdateClientUseCase';

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateClientBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      phone: z.string(),
      birth_date: z.date(),
      address_id: z.string(),
    });

    const { name, email, password, phone, birth_date, address_id } =
      updateClientBodySchema.parse(request.body);

    const id = z.string().parse(request.params.id);

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    const client = await updateClientUseCase.execute({
      id,
      name,
      email,
      password,
      phone,
      birth_date,
      address_id,
    });

    return response.json(client);
  }
}

export { UpdateClientController };
