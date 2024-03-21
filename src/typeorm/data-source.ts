import { DataSource } from 'typeorm';

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
  migrations: [],
});
