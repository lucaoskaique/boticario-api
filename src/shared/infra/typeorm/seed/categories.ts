/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../data-source';

async function create() {
  const connection = await AppDataSource.initialize();

  await connection.query('DELETE FROM categories');

  const query = `
  INSERT INTO categories(id, name, description, created_at)
  VALUES
  ('${uuidV4()}', 'Category 1', 'Description Category 1', 'now()'),
  ('${uuidV4()}', 'Category 2', 'Description Category 2', 'now()'),
  ('${uuidV4()}', 'Category 3', 'Description Category 3', 'now()'),
  ('${uuidV4()}', 'Category 4', 'Description Category 4', 'now()'),
  ('${uuidV4()}', 'Category 5', 'Description Category 5', 'now()'),
  `;
  await connection.query(query);

  await connection.destroy();
}

create()
  .then(() => {
    console.log('Categories created!');
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
