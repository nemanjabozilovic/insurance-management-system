import { prisma } from '../../infra/prisma/client';
import { Policy } from '@prisma/client';

export const policiesRepository = {
  findAll: async (): Promise<Policy[]> => {
    return prisma.policy.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  },

  findById: async (id: string): Promise<Policy | null> => {
    return prisma.policy.findUnique({
      where: { id },
    });
  },

  findByName: async (name: string): Promise<Policy | null> => {
    return prisma.policy.findUnique({
      where: { name },
    });
  },
};

