import { User, Policy, UserPolicy } from '@prisma/client';

export type UserWithPolicies = User & {
  policies: (UserPolicy & {
    policy: Policy;
  })[];
};

