import { type NextFunction, type Request, type Response } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import { AppError } from '@shared/errors/AppError';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS,
  });

  redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
  });

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 5,
    duration: 5,
    // Use this flag for the `redis` package
    // useRedisPackage: true,
  });
  const ip: string | number = request.ip ?? '';
  console.log('Rate Limiter: OK', request.ip);

  try {
    await limiter.consume(ip);

    next();
  } catch (err) {
    console.log(err);
    throw new AppError('Too many requests', 429);
  }
}
