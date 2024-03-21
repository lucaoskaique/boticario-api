import { Address } from '@modules/clients/infra/typeorm/entities/Address';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { DataSource } from 'typeorm';

import {
  CreateClients1710986173055,
  CreateAddresses1710985056783,
  CreateCategories1710967133852,
} from './migrations';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'password',
  database: 'boticario',
  synchronize: true,
  logging: false,
  entities: [Client, Address],
  subscribers: [],
  migrations: [
    CreateClients1710986173055,
    CreateAddresses1710985056783,
    CreateCategories1710967133852,
  ],
});
