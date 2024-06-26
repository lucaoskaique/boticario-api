import { type ICreateAddressDTO } from '@modules/clients/dtos/ICreateAddressDTO';
import { type IAddressesRepository } from '@modules/clients/repositories/IAddressesRepository';
import { type Repository } from 'typeorm';

import { AppDataSource } from '@shared/infra/typeorm/data-source';

import { Address } from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = AppDataSource.getRepository(Address);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async create({
    cep,
    street,
    street_number,
    complement,
    neighborhood,
    city,
    uf,
  }: ICreateAddressDTO): Promise<Address> {
    const client = this.repository.create({
      cep,
      street,
      street_number,
      complement,
      neighborhood,
      city,
      uf,
    });

    await this.repository.save(client);

    return client;
  }

  async list(): Promise<Address[]> {
    return await this.repository.find();
  }

  async update(address: Address): Promise<Address> {
    await this.repository.save(address);

    return address;
  }

  async findById(id: string): Promise<Address | null> {
    const address = await this.repository.findOne({ where: { id } });

    return address;
  }
}

export { AddressesRepository };
