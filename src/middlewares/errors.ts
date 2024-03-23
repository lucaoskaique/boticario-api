/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { env } from 'env';
import { type NextFunction, type Request, type Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '@shared/errors/AppError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: err.format() });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
};
