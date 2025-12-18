import { Request, Response, NextFunction } from 'express';
import { policiesService } from './policies.service';
import { handleRequest, handleNoContentRequest } from '../../shared/controller-utils';

export const policiesController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    await handleRequest(() => policiesService.getAll(), res, next);
  },

  assignToUser: async (req: Request, res: Response, next: NextFunction) => {
    const { userId, policyId } = req.body;
    await handleRequest(() => policiesService.assignToUser(userId, policyId), res, next, 201);
  },

  removeFromUser: async (req: Request, res: Response, next: NextFunction) => {
    const { userId, policyId } = req.params;
    await handleNoContentRequest(() => policiesService.removeFromUser(userId, policyId), res, next);
  },
};

