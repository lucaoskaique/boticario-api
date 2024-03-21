import cors from 'cors';
import express from 'express';
import { errorHandler } from 'middlewares/errors';
import 'dotenv/config';
import { routes } from 'routes';
import 'reflect-metadata';
import 'express-async-errors';
import './container';

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errorHandler);

export { app };
