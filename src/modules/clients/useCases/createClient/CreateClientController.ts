import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createClientBodySchema = z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
      cpf: z.string(),
      phone: z.string(),
      birth_date: z.coerce.date(),
      address_id: z.string(),
    });

    const { username, email, password, cpf, phone, birth_date, address_id } =
      createClientBodySchema.parse(request.body);

    try {
      const createClientUseCase = container.resolve(CreateClientUseCase);

      await createClientUseCase.execute({
        username,
        email,
        password,
        cpf,
        phone,
        birth_date,
        address_id,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        return response.status(500).json({ errorMessage: error.message });
      }
    }
    return response.status(201).send();
  }
}

export { CreateClientController };
