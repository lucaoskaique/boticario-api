import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, password, cpf, phone, birth_date, address_id } =
      request.body;

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

    return response.status(201).send();
  }
}

export { CreateClientController };
