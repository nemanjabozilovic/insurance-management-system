import { Policy } from '../policies/types';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  email: string;
  profileImageUrl: string | null;
}

export interface UserWithPolicies extends User {
  policies: {
    id: string;
    userId: string;
    policyId: string;
    createdAt: string;
    policy: Policy;
  }[];
}

