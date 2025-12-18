import { policiesRepository } from './policies.repository';
import { userPoliciesRepository } from './user-policies.repository';
import { BadRequestError } from '../../shared/errors';
import { findUserOrThrow, findPolicyOrThrow } from '../../shared/entity-utils';
import { Policy } from '@prisma/client';

export const policiesService = {
  getAll: async (): Promise<Policy[]> => {
    return policiesRepository.findAll();
  },

  assignToUser: async (userId: string, policyId: string) => {
    await findUserOrThrow(userId);
    await findPolicyOrThrow(policyId);

    const existing = await userPoliciesRepository.findByUserAndPolicy(userId, policyId);
    if (existing) {
      throw new BadRequestError('User already has this policy');
    }

    return userPoliciesRepository.create(userId, policyId);
  },

  removeFromUser: async (userId: string, policyId: string) => {
    await findUserOrThrow(userId);
    await findPolicyOrThrow(policyId);

    const existing = await userPoliciesRepository.findByUserAndPolicy(userId, policyId);
    if (!existing) {
      throw new BadRequestError('User does not have this policy');
    }

    return userPoliciesRepository.delete(existing.id);
  },
};

