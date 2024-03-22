import { type ICreateAddressDTO } from '@modules/clients/dtos/ICreateAddressDTO';
import { IAddressesRepository } from '@modules/clients/repositories/IAddressesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  async execute({
    cep,
    street,
    street_number,
    complement,
    neighborhood,
    city,
    uf,
  }: ICreateAddressDTO): Promise<void> {
    await this.addressesRepository.create({
      cep,
      street,
      street_number,
      complement,
      neighborhood,
      city,
      uf,
    });
  }
}

export { CreateAddressUseCase };
