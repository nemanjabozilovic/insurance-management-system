import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { policiesApi } from './api';
import { AssignPolicyInput } from './types';

export const usePolicies = () => {
  return useQuery({
    queryKey: ['policies'],
    queryFn: () => policiesApi.getAll(),
  });
};

export const useAssignPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignPolicyInput) => policiesApi.assignToUser(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
    },
  });
};

export const useRemovePolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, policyId }: { userId: string; policyId: string }) =>
      policiesApi.removeFromUser(userId, policyId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
    },
  });
};

