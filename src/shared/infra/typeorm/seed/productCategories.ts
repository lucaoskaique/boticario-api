/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../data-source';

async function create() {
  const connection = await AppDataSource.initialize();

  await connection.query('DELETE FROM products');
  await connection.query('DELETE FROM categories');

  const category1Id = uuidV4();
  const category2Id = uuidV4();
  const category3Id = uuidV4();
  const category4Id = uuidV4();

  const categoriesQuery = `
  INSERT INTO categories(id, name, description, created_at)
  VALUES
  ('${category1Id}', 'Category 1', 'Description Category 1', 'now()'),
  ('${category2Id}', 'Category 2', 'Description Category 2', 'now()'),
  ('${category3Id}', 'Category 3', 'Description Category 3', 'now()'),
  ('${category4Id}', 'Category 4', 'Description Category 4', 'now()')
  `;

  await connection.query(categoriesQuery);

  const productsQuery = `
  INSERT INTO products(id, name, description, price, inventory_count, category_id, image_url,  created_at, updated_at)
  VALUES
  ('${uuidV4()}', 'Product 1', 'Description Product 1', 10.00, 10, '${category1Id}', '', 'now()', 'now()'),
  ('${uuidV4()}', 'Product 2', 'Description Product 2', 20.00, 20, '${category2Id}', '', 'now()', 'now()'),
  ('${uuidV4()}', 'Product 3', 'Description Product 3', 30.00, 30, '${category3Id}', '', 'now()', 'now()'),
  ('${uuidV4()}', 'Product 4', 'Description Product 4', 40.00, 40, '${category4Id}', '', 'now()', 'now()')
  `;

  await connection.query(productsQuery);

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
