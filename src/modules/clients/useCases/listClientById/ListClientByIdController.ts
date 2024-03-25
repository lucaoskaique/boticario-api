import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

import { ListClientByIdUseCase } from './ListClientByIdUseCase';
class ListClientByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = z.string().parse(request.params.id);
    let client;
    try {
      const listClientByIdUseCase = container.resolve(ListClientByIdUseCase);

      client = await listClientByIdUseCase.execute(id);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
    }
    return response.json(client);
  }
}

export { ListClientByIdController };
