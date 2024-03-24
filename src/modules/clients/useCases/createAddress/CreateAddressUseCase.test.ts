/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { type ICreateAddressDTO } from '@modules/clients/dtos/ICreateAddressDTO';
import { AddressesRepositoryInMemory } from '@modules/clients/repositories/in-memory/AddressesRepositoryInMemory';

import { CreateAddressUseCase } from './CreateAddressUseCase';

let createAddressesUseCase: CreateAddressUseCase;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;

describe('Create Address', () => {
  beforeEach(() => {
    addressesRepositoryInMemory = new AddressesRepositoryInMemory();

    createAddressesUseCase = new CreateAddressUseCase(
      addressesRepositoryInMemory,
    );
  });

  it('should be able to create a new address', async () => {
    const address: ICreateAddressDTO = {
      street: 'Rua Teste',
      street_number: 123,
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      uf: 'rs',
      cep: '12345-678',
      complement: 'Complemento Teste',
    };

    const addressCreated = await createAddressesUseCase.execute(address);

    expect(addressCreated).toHaveProperty('id');
  });
});
