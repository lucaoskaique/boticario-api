import cors from 'cors';
import express from 'express';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World DEV EM DOBRO' });
});

export { app };
