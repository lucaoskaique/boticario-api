import { type ICreateAddressDTO } from '../dtos/ICreateAddressDTO';
import { type Address } from '../infra/typeorm/entities/Address';

interface IAddressesRepository {
  create: (data: ICreateAddressDTO) => Promise<void>;
  list: () => Promise<Address[]> | [];
  update: (data: Address) => Promise<Address>;
  findById: (id: string) => Promise<Address | null>;
}

export type { IAddressesRepository };
