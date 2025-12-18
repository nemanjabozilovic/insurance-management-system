export interface Policy {
  id: string;
  name: string;
  shortDescription: string;
  monthlyPremium: number;
}

export interface AssignPolicyInput {
  userId: string;
  policyId: string;
}

