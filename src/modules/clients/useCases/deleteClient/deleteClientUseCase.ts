import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const client = await this.clientsRepository.findById(id);

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    await this.clientsRepository.delete(id);
  }
}

export { DeleteClientUseCase };
