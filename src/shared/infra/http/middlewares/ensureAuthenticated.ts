/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ClientsRepository } from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: client_id } = verify(
      token,
      '2e247e2eb505c42b362e80ed4d05b078',
    ) as IPayload;

    const clientsRepository = new ClientsRepository();
    const client = clientsRepository.findById(client_id);

    if (!client) {
      throw new AppError('Client does not exists', 401);
    }

    request.client = {
      id: client_id,
    };

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
