import { type ICreateAddressDTO } from '@modules/clients/dtos/ICreateAddressDTO';
import { AddressesRepositoryInMemory } from '@modules/clients/repositories/in-memory/AddressesRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { DeleteAddressUseCase } from './deleteAdressUseCase';

describe('DeleteAddressUseCase', () => {
  let addressesRepository: AddressesRepositoryInMemory;
  let deleteAddressUseCase: DeleteAddressUseCase;

  beforeEach(() => {
    addressesRepository = new AddressesRepositoryInMemory();
    deleteAddressUseCase = new DeleteAddressUseCase(addressesRepository);
  });

  it('should be able to delete an address', async () => {
    const address: ICreateAddressDTO = {
      street: 'Rua Teste',
      street_number: 123,
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      uf: 'rs',
      cep: '12345-678',
      complement: 'Complemento Teste',
    };

    const addressCreated = await addressesRepository.create(address);

    await deleteAddressUseCase.execute(addressCreated.id);

    expect(await addressesRepository.findById(addressCreated.id)).toBeNull();
  });

  it('should not be able to delete a non-existing address', async () => {
    await expect(
      deleteAddressUseCase.execute('non-existing-address-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
