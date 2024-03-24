/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../data-source';

async function create() {
  const connection = await AppDataSource.initialize();

  await connection.query('DELETE FROM addresses');

  const query = `
  INSERT INTO addresses(id, street, street_number, city, uf, cep, neighborhood, complement, created_at, updated_at)
  VALUES
  ('${uuidV4()}', 'Rua A', 123, 'Porto Alegre', 'RS', '12345-678', 'bairro A', 'complement A','now()', 'now()'),
  ('${uuidV4()}', 'Rua B', 456, 'Porto Alegre', 'RS', '12345-678', 'bairro B', 'complement B', 'now()', 'now()'),
  ('${uuidV4()}', 'Rua C', 789, 'Porto Alegre', 'RS', '12345-678', 'bairro C', 'complement C', 'now()', 'now()'),
  ('${uuidV4()}', 'Rua D', 1011, 'Porto Alegre', 'RS', '12345-678', 'bairro D', 'complement D', 'now()', 'now()'),
  ('${uuidV4()}', 'Rua E', 1213, 'Porto Alegre', 'RS', '12345-678', 'bairro E', 'complement E', 'now()', 'now()')
  `;
  await connection.query(query);

  await connection.destroy();
}

create()
  .then(() => {
    console.log('Addresses created!');
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
