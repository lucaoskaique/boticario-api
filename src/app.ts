import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { routes } from 'routes';
import 'reflect-metadata';

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

export { app };
