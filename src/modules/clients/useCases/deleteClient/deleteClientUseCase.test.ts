import { type ICreateClientDTO } from '@modules/clients/dtos/ICreateClientDTO';
import { AddressesRepositoryInMemory } from '@modules/clients/repositories/in-memory/AddressesRepositoryInMemory';
import { ClientsRepositoryInMemory } from '@modules/clients/repositories/in-memory/ClientsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateClientUseCase } from '../createClient/CreateClientUseCase';
import { DeleteClientUseCase } from './deleteClientUseCase';

describe('DeleteClientUseCase', () => {
  let clientsRepository: ClientsRepositoryInMemory;
  let deleteClientUseCase: DeleteClientUseCase;
  let createClientUseCase: CreateClientUseCase;

  let addressesRepositoryInMemory: AddressesRepositoryInMemory;

  beforeEach(() => {
    clientsRepository = new ClientsRepositoryInMemory();
    addressesRepositoryInMemory = new AddressesRepositoryInMemory();

    deleteClientUseCase = new DeleteClientUseCase(clientsRepository);
    createClientUseCase = new CreateClientUseCase(
      clientsRepository,
      addressesRepositoryInMemory,
    );
  });

  it('should be able to delete a client', async () => {
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

    const client = await createClientUseCase.execute(createClientDTO);

    await deleteClientUseCase.execute(client.id);

    expect(await clientsRepository.findById(client.id)).toBeNull();
  });

  it('should not be able to delete a non-existing client', async () => {
    await expect(
      deleteClientUseCase.execute('non-existing-client-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
