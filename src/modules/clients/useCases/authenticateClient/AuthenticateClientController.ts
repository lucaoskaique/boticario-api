import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { AuthenticateClientUseCase } from './AuthenticateClientUseCase';

class AuthenticateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = z
      .object({
        username: z.string(),
        password: z.string(),
      })
      .parse(request.body);

    const authenticateClientUseCase = container.resolve(
      AuthenticateClientUseCase,
    );

    const data = await authenticateClientUseCase.execute(username, password);

    return response.json(data);
  }
}

export { AuthenticateClientController };
