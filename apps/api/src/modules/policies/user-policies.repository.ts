import { prisma } from '../../infra/prisma/client';
import { UserPolicy, Policy } from '@prisma/client';

export const userPoliciesRepository = {
  findByUserAndPolicy: async (userId: string, policyId: string): Promise<UserPolicy | null> => {
    return prisma.userPolicy.findUnique({
      where: {
        userId_policyId: {
          userId,
          policyId,
        },
      },
    });
  },

  create: async (userId: string, policyId: string): Promise<UserPolicy & { policy: Policy }> => {
    return prisma.userPolicy.create({
      data: {
        userId,
        policyId,
      },
      include: {
        policy: true,
      },
    });
  },

  delete: async (id: string): Promise<void> => {
    await prisma.userPolicy.delete({
      where: { id },
    });
  },
};

