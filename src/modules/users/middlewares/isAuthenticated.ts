import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { verify } from 'jsonwebtoken';

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token JWT inexistente.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError('Token JWT invalida.');
  }
}
