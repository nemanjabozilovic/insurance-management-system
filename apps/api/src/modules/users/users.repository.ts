import { prisma } from '../../infra/prisma/client';
import { User } from '@prisma/client';
import { UserWithPolicies } from './users.types';

const includePolicies = {
  policies: {
    include: {
      policy: true,
    },
  },
} as const;

export const usersRepository = {
  findAll: async (): Promise<UserWithPolicies[]> => {
    return prisma.user.findMany({
      include: includePolicies,
      orderBy: {
        lastName: 'asc',
      },
    });
  },

  findById: async (id: string): Promise<UserWithPolicies | null> => {
    return prisma.user.findUnique({
      where: { id },
      include: includePolicies,
    });
  },

  findByUsername: async (username: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { username },
    });
  },

  findByEmail: async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  create: async (data: {
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
    email: string;
    profileImageUrl?: string | null;
  }): Promise<UserWithPolicies> => {
    return prisma.user.create({
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
      },
      include: includePolicies,
    });
  },

  update: async (
    id: string,
    data: {
      username?: string;
      firstName?: string;
      lastName?: string;
      dateOfBirth?: Date;
      address?: string;
      phoneNumber?: string;
      email?: string;
      profileImageUrl?: string | null;
    }
  ): Promise<UserWithPolicies> => {
    const updateData: any = { ...data };
    if (data.dateOfBirth) {
      updateData.dateOfBirth = new Date(data.dateOfBirth);
    }
    return prisma.user.update({
      where: { id },
      data: updateData,
      include: includePolicies,
    });
  },

  updateProfileImage: async (id: string, imageUrl: string): Promise<User> => {
    return prisma.user.update({
      where: { id },
      data: { profileImageUrl: imageUrl },
    });
  },
};

