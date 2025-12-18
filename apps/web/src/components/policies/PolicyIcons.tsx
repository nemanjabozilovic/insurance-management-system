import { Car, Home, Heart, Laptop, Plane, Loader2 } from 'lucide-react';
import { Policy } from '@/features/policies/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PolicyIconsProps {
  policies: Policy[];
  onAssignPolicy: (policyId: string) => void;
  assigningPolicy: string | null;
  disabled?: boolean;
  assignedPolicyIds?: string[];
}

const policyIcons: Record<string, { icon: typeof Car; color: string }> = {
  'Car Insurance': { icon: Car, color: 'text-blue-600' },
  'Home Insurance': { icon: Home, color: 'text-green-600' },
  'Life Insurance': { icon: Heart, color: 'text-red-600' },
  'Device Insurance': { icon: Laptop, color: 'text-purple-600' },
  'Travel Insurance': { icon: Plane, color: 'text-orange-600' },
};

export function PolicyIcons({ policies, onAssignPolicy, assigningPolicy, disabled, assignedPolicyIds = [] }: PolicyIconsProps) {
  return (
    <div className="flex gap-2 justify-center" onClick={(e) => e.stopPropagation()}>
      {policies.map((policy) => {
        const iconConfig = policyIcons[policy.name];
        const Icon = iconConfig?.icon || Car;
        const color = iconConfig?.color || 'text-gray-600';
        const isAssigning = assigningPolicy?.endsWith(policy.id);
        const isAssigned = assignedPolicyIds.includes(policy.id);
        const isDisabled = disabled || isAssigned;

        return (
          <Button
            key={policy.id}
            variant="ghost"
            size="icon"
            className={cn(
              'h-10 w-10',
              color,
              isDisabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (!isDisabled) {
                onAssignPolicy(policy.id);
              }
            }}
            disabled={isDisabled}
            title={isAssigned ? `${policy.name} (Already assigned)` : policy.name}
          >
            {isAssigning ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Icon className="h-5 w-5" />
            )}
          </Button>
        );
      })}
    </div>
  );
}

