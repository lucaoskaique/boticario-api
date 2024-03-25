import cors from 'cors';
import express from 'express';
import 'dotenv/config';
import { resolve } from 'path';
import swaggerUi from 'swagger-ui-express';

import { routes } from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';
import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';
import { errorHandler } from './middlewares/errors';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(express.json());

app.use(rateLimiter);

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/files', express.static(resolve(__dirname, '..', '..', '..', 'tmp')));

app.use(routes);

app.use(errorHandler);

export { app };
