import { usersRepository } from './users.repository';
import { User, UserWithPolicies } from './users.types';
import { findUserOrThrow } from '../../shared/entity-utils';
import { ConflictError, BadRequestError } from '../../shared/errors';
import { CreateUserInput, UpdateUserInput } from './users.validation';

async function checkUsernameUnique(username: string, excludeId?: string): Promise<void> {
  const existing = await usersRepository.findByUsername(username);
  if (existing && existing.id !== excludeId) {
    throw new ConflictError('Username already exists');
  }
}

async function checkEmailUnique(email: string, excludeId?: string): Promise<void> {
  const existing = await usersRepository.findByEmail(email);
  if (existing && existing.id !== excludeId) {
    throw new ConflictError('Email already exists');
  }
}

export const usersService = {
  getAll: async (): Promise<UserWithPolicies[]> => {
    return usersRepository.findAll();
  },

  getById: async (id: string): Promise<UserWithPolicies> => {
    return findUserOrThrow(id);
  },

  create: async (data: CreateUserInput): Promise<UserWithPolicies> => {
    await checkUsernameUnique(data.username);
    await checkEmailUnique(data.email);

    return usersRepository.create({
      ...data,
      dateOfBirth: new Date(data.dateOfBirth),
      profileImageUrl: data.profileImageUrl || null,
    });
  },

  update: async (id: string, data: UpdateUserInput): Promise<UserWithPolicies> => {
    await findUserOrThrow(id);

    if (data.username) {
      await checkUsernameUnique(data.username, id);
    }

    if (data.email) {
      await checkEmailUnique(data.email, id);
    }

    const updateData: any = { ...data };
    if (data.dateOfBirth) {
      updateData.dateOfBirth = new Date(data.dateOfBirth);
    }

    return usersRepository.update(id, updateData);
  },

  updateProfileImage: async (id: string, imageUrl: string): Promise<User> => {
    await findUserOrThrow(id);
    return usersRepository.updateProfileImage(id, imageUrl);
  },
};

