/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { AppDataSource } from '../data-source';

async function create() {
  const connection = await AppDataSource.initialize();

  // Limpe as tabelas
  await connection.query('DELETE FROM products_orders');
  await connection.query('DELETE FROM orders');
  await connection.query('DELETE FROM products');
  await connection.query('DELETE FROM clients');
  await connection.query('DELETE FROM categories');
  await connection.query('DELETE FROM addresses');

  await connection.destroy();
}

create()
  .then(() => {
    console.log('Addresses and client created!');
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
