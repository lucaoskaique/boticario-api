/* eslint-disable @typescript-eslint/explicit-function-return-type */
// src/seeds/AllTablesSeed.ts
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../data-source';

async function create() {
  const connection = await AppDataSource.initialize();

  // Insira os dados iniciais
  const clientId = uuidV4();
  const addressId = uuidV4();
  const categoryId = uuidV4();
  const productId = uuidV4();
  const orderId = uuidV4();
  const productOrderId = uuidV4();

  const addressesQuery = `INSERT INTO addresses(id, street, street_number, city, uf, cep, neighborhood, complement, created_at, updated_at) VALUES ('${addressId}', 'Rua A', 123, 'Porto Alegre', 'RS', '12345-678', 'bairro A', 'complement A','now()', 'now()')`;

  await connection.query(addressesQuery);

  const password1 = await hash('clientteste', 8);

  const clientsQuery = `INSERT INTO clients(id, name, email, username, cpf, phone, birth_date, address_id, created_at, updated_at, password) VALUES ('${clientId}', 'Client teste', 'clientteste@email.com', 'clientteste', '02104465010', '99999999999', '1990-01-01', '${addressId}', 'now()', 'now()', '${password1}')`;

  await connection.query(clientsQuery);

  const categoriesQuery = `INSERT INTO categories(id, name, description, created_at) VALUES ('${categoryId}', 'Category teste', 'Description Category teste', 'now()')`;
  await connection.query(categoriesQuery);

  const productsQuery = `INSERT INTO products(id, name, description, price, inventory_count, category_id, image_url,  created_at, updated_at)
  VALUES('${productId}', 'Product teste', 'Description Product teste', 10.00, 10, '${categoryId}', '', 'now()', 'now()')`;
  await connection.query(productsQuery);

  const ordersQuery = `INSERT INTO orders(id, client_id, order_date, amount, status, created_at, updated_at) VALUES ('${orderId}', '${clientId}', '2024-03-24', 20.0, 'pending','now()', 'now()')`;
  await connection.query(ordersQuery);

  const productordersQuery = `INSERT INTO products_orders(id, order_id, product_id, product_count, product_price) VALUES ('${productOrderId}','${orderId}', '${productId}', 1, 10.0)`;
  await connection.query(productordersQuery);

  await connection.destroy();
}

create()
  .then(() => {
    console.log('All created!');
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
