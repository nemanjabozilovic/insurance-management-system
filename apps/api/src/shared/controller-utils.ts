import { Response, NextFunction } from 'express';

export async function handleRequest<T>(
  handler: () => Promise<T>,
  res: Response,
  next: NextFunction,
  statusCode: number = 200
): Promise<void> {
  try {
    const result = await handler();
    res.status(statusCode).json(result);
  } catch (error) {
    next(error);
  }
}

export async function handleNoContentRequest(
  handler: () => Promise<void>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await handler();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

