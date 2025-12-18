import { http } from '@/lib/http';
import { Policy, AssignPolicyInput } from './types';

export const policiesApi = {
  getAll: async (): Promise<Policy[]> => {
    return http<Policy[]>('/api/policies');
  },

  assignToUser: async (data: AssignPolicyInput): Promise<void> => {
    return http<void>('/api/policies/assign', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  removeFromUser: async (userId: string, policyId: string): Promise<void> => {
    return http<void>(`/api/policies/users/${userId}/${policyId}`, {
      method: 'DELETE',
    });
  },
};

