import { type Address } from '@modules/clients/infra/typeorm/entities/Address';
import { IAddressesRepository } from '@modules/clients/repositories/IAddressesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute(): Promise<Address[]> {
    const addresses = await this.addressesRepository.list();
    return addresses;
  }
}

export { ListAddressUseCase };
