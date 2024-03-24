import { IAddressesRepository } from '@modules/clients/repositories/IAddressesRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address not found', 404);
    }

    await this.addressesRepository.delete(id);
  }
}

export { DeleteAddressUseCase };
