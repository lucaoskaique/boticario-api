import { type ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { AddressesRepositoryInMemory } from '@modules/clients/repositories/in-memory/AddressesRepositoryInMemory';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/in-memory/ClientsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateClientUseCase } from './CreateClientUseCase';

let createClientUseCase: CreateClientUseCase;
let clientsRepositoryInMemory: ClientsRepositoryInMemory;
let addressesRepositoryInMemory: AddressesRepositoryInMemory;

describe('CreateClientUseCase', () => {
  beforeEach(() => {
    clientsRepositoryInMemory = new ClientsRepositoryInMemory();
    addressesRepositoryInMemory = new AddressesRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(
      clientsRepositoryInMemory,
      addressesRepositoryInMemory,
    );
  });

  it('should be able to create a new client', async () => {
    const createAddressDTO = {
      street: 'Rua Teste',
      street_number: 123,
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      uf: 'rs',
      cep: '12345-678',
      complement: 'Complemento Teste',
    };

    const address = await addressesRepositoryInMemory.create(createAddressDTO);

    const createClientDTO: ICreateClientDTO = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      cpf: '12345678901',
      phone: '1234567890',
      birth_date: new Date('1990-01-01'),
      address_id: address.id,
    };

    const createdClient = await createClientUseCase.execute(createClientDTO);

    expect(createdClient).toBeDefined();
    expect(createdClient.username).toBe(createClientDTO.username);
    expect(createdClient.email).toBe(createClientDTO.email);
  });

  it('should not be able to create a client with an existing username', async () => {
    const createAddressDTO = {
      street: 'Rua Teste',
      street_number: 123,
      neighborhood: 'Bairro Teste',
      city: 'Cidade Teste',
      uf: 'rs',
      cep: '12345-678',
      complement: 'Complemento Teste',
    };

    const address = await addressesRepositoryInMemory.create(createAddressDTO);

    const createClientDTO: ICreateClientDTO = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      cpf: '12345678901',
      phone: '1234567890',
      birth_date: new Date('1990-01-01'),
      address_id: address.id,
      name: 'valid-name',
    };

    await createClientUseCase.execute(createClientDTO);

    // shoud not be able to create a client with an existing username

    await expect(
      createClientUseCase.execute(createClientDTO),
    ).rejects.toBeInstanceOf(AppError);
  });
});
