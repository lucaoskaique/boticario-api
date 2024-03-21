/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppError } from '@errors/AppError';
import { type NextFunction, type Request, type Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
};
