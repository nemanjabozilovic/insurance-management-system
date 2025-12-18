import { http } from '@/lib/http';
import { User, UserWithPolicies } from './types';

export interface CreateUserInput {
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  email: string;
  profileImageUrl?: string | null;
}

export interface UpdateUserInput {
  username?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  profileImageUrl?: string | null;
}

export const usersApi = {
  getAll: async (): Promise<UserWithPolicies[]> => {
    return http<UserWithPolicies[]>('/api/users');
  },

  getById: async (id: string): Promise<UserWithPolicies> => {
    return http<UserWithPolicies>(`/api/users/${id}`);
  },

  create: async (data: CreateUserInput): Promise<UserWithPolicies> => {
    return http<UserWithPolicies>('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: UpdateUserInput): Promise<UserWithPolicies> => {
    return http<UserWithPolicies>(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  updateProfileImage: async (id: string, imageUrl: string): Promise<User> => {
    return http<User>(`/api/users/${id}/profile-image`, {
      method: 'PATCH',
      body: JSON.stringify({ imageUrl }),
    });
  },
};

