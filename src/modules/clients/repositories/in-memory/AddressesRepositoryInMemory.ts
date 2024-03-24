import { type ICreateAddressDTO } from '@modules/clients/dtos/ICreateAddressDTO';
import { Address } from '@modules/clients/infra/typeorm/entities/Address';
import { v4 as uuid } from 'uuid';

import { type IAddressesRepository } from '../IAddressesRepository';
class AddressesRepositoryInMemory implements IAddressesRepository {
  private addresses: Address[] = [];

  async create(data: ICreateAddressDTO): Promise<void> {
    const address = new Address();

    Object.assign(address, {
      ...data,
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.addresses.push(address);
  }

  async list(): Promise<Address[]> {
    return this.addresses;
  }

  async update(data: Address): Promise<Address> {
    const index = this.addresses.findIndex((address) => address.id === data.id);

    this.addresses[index] = data;

    return data;
  }

  async findById(id: string): Promise<Address | null> {
    const address = this.addresses.find((address) => address.id === id);

    return address ?? null;
  }

  async delete(id: string): Promise<void> {
    const index = this.addresses.findIndex((address) => address.id === id);

    this.addresses.splice(index, 1);
  }
}

export { AddressesRepositoryInMemory };
