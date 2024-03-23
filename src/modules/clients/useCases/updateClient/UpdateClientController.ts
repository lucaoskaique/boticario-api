import { type Request, type Response } from 'express';
import { container } from 'tsyringe';

import { UpdateClientUseCase } from './UpdateClientUseCase';

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    const client = await updateClientUseCase.execute({
      id,
      name,
      email,
      password,
    });

    return response.json(client);
  }
}

export { UpdateClientController };
