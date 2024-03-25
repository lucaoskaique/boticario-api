/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../data-source';

async function create() {
  const connection = await AppDataSource.initialize();

  await connection.query('DELETE FROM clients');
  await connection.query('DELETE FROM addresses');

  const addresses1Id = uuidV4();
  const addresses2Id = uuidV4();
  const addresses3Id = uuidV4();
  const addresses4Id = uuidV4();

  const addressesQuery = `
  INSERT INTO addresses(id, street, street_number, city, uf, cep, neighborhood, complement, created_at, updated_at)
  VALUES
  ('${addresses1Id}', 'Rua A', 123, 'Porto Alegre', 'RS', '12345-678', 'bairro A', 'complement A','now()', 'now()'),
  ('${addresses2Id}', 'Rua B', 456, 'Porto Alegre', 'RS', '12345-678', 'bairro B', 'complement B', 'now()', 'now()'),
  ('${addresses3Id}', 'Rua C', 789, 'Porto Alegre', 'RS', '12345-678', 'bairro C', 'complement C', 'now()', 'now()'),
  ('${addresses4Id}', 'Rua D', 1011, 'Porto Alegre', 'RS', '12345-678', 'bairro D', 'complement D', 'now()', 'now()')
  `;

  await connection.query(addressesQuery);

  const password1 = await hash('client1', 8);
  const password2 = await hash('client2', 8);
  const password3 = await hash('client3', 8);
  const password4 = await hash('client4', 8);

  const clientsQuery = `
  INSERT INTO clients(id, name, email, username, cpf, phone, birth_date, address_id, created_at, updated_at, password)
  VALUES
  ('${uuidV4()}', 'Client 1', 'client1@email.com', 'client1', '12345678901', '99999999999', '01-01-1990', '${addresses1Id}', 'now()', 'now()', '${password1}'),
  ('${uuidV4()}', 'Client 2', 'client2@email.com', 'client2', '12345678902', '99999999998', '1990-01-02', '${addresses2Id}', 'now()', 'now()', '${password2}'),
  ('${uuidV4()}', 'Client 3', 'client3@email.com', 'client3', '12345678903', '99999999997', '1990-01-03', '${addresses3Id}', 'now()', 'now()', '${password3}'),
  ('${uuidV4()}', 'Client 4', 'client4@email.com', 'client4', '12345678904', '99999999996', '1990-01-04', '${addresses4Id}', 'now()', 'now()', '${password4}')
`;

  await connection.query(clientsQuery);

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
