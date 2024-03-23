import cors from 'cors';
import express from 'express';

import 'dotenv/config';
import { routes } from '@shared/infra/http/routes';

import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';
import { errorHandler } from './middlewares/errors';

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errorHandler);

export { app };
