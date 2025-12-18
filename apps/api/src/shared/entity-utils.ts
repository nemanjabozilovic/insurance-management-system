import { NotFoundError } from './errors';
import { usersRepository } from '../modules/users/users.repository';
import { policiesRepository } from '../modules/policies/policies.repository';
import { UserWithPolicies } from '../modules/users/users.types';
import { Policy } from '@prisma/client';

export async function findUserOrThrow(id: string): Promise<UserWithPolicies> {
  const user = await usersRepository.findById(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
}

export async function findPolicyOrThrow(id: string): Promise<Policy> {
  const policy = await policiesRepository.findById(id);
  if (!policy) {
    throw new NotFoundError('Policy not found');
  }
  return policy;
}

