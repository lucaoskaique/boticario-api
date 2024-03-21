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
  entities: [],
  subscribers: [],
  migrations: [
    CreateClients1710986173055,
    CreateAddresses1710985056783,
    CreateCategories1710967133852,
  ],
});
