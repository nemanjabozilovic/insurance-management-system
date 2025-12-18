import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { handleRequest } from '../../shared/controller-utils';

export const usersController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    await handleRequest(() => usersService.getAll(), res, next);
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await handleRequest(() => usersService.getById(id), res, next);
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    await handleRequest(() => usersService.create(req.body), res, next, 201);
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await handleRequest(() => usersService.update(id, req.body), res, next);
  },

  updateProfileImage: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { imageUrl } = req.body;
    await handleRequest(() => usersService.updateProfileImage(id, imageUrl), res, next);
  },
};

