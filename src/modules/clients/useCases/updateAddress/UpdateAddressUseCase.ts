import { AppError } from '@errors/AppError';
import { type Address } from '@modules/clients/infra/typeorm/entities/Address';
import { IAddressesRepository } from '@modules/clients/repositories/IAddressesRepository';
import { inject, injectable } from 'tsyringe';

interface IUpdateAddressDTO {
  id: string;
  cep: string;
  street: string;
  street_number: number;
  complement: string;
  neighborhood: string;
  city: string;
  uf: string;
}

@injectable()
class UpdateAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute(data: IUpdateAddressDTO): Promise<Address> {
    const client = await this.addressesRepository.findById(data.id);

    if (!client) {
      throw new AppError('Address not found');
    }

    return await this.addressesRepository.update({
      ...client,
      ...data,
    });
  }
}

export { UpdateAddressUseCase };
