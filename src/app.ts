import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { AppDataSource } from 'typeorm/data-source';

const app = express();

app.use(express.json());

app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Database connection error', error);
  });

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World DEV EM DOBRO' });
});

export { app };
