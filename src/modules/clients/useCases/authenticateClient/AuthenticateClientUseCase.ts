import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

interface IResponse {
  client: {
    id: string;
    name: string;
    username: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(username: string, password: string): Promise<IResponse> {
    // Buscar o cliente pelo email
    const client = await this.clientsRepository.findByUsername(username);

    // Se não existir, retornar um erro
    if (!client) {
      throw new AppError('Client not found');
    }

    // Verificar se a senha está correta
    const passwordMatch = await bcrypt.compare(password, client.password);

    // Se não estiver correta, retornar um erro
    if (!passwordMatch) {
      throw new AppError('Email or password incorret!', 401);
    }

    const token = sign({}, '2e247e2eb505c42b362e80ed4d05b078', {
      subject: client.id,
      expiresIn: '1d',
    });

    const tokenReturn: IResponse = {
      token,
      client: {
        id: client.id,
        name: client.name,
        username: client.username,
        email: client.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateClientUseCase };
