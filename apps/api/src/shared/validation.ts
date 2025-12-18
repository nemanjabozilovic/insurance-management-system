import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { BadRequestError } from './errors';

export function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        next(new BadRequestError(`Validation error: ${messages}`));
      } else {
        next(error);
      }
    }
  };
}

