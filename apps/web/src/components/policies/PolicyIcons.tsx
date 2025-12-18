import { useState } from 'react';
import { Fragment } from 'react';
import { Car, Home, Heart, Laptop, Plane, Loader2 } from 'lucide-react';
import { Policy } from '@/features/policies/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  const [showDialog, setShowDialog] = useState<string | null>(null);

  return (
    <div className="flex gap-2 justify-center" onClick={(e) => e.stopPropagation()}>
      {policies.map((policy) => {
        const iconConfig = policyIcons[policy.name];
        const Icon = iconConfig?.icon || Car;
        const color = iconConfig?.color || 'text-gray-600';
        const isAssigning = assigningPolicy?.endsWith(policy.id);
        const isAssigned = assignedPolicyIds.includes(policy.id);

        if (isAssigned) {
          return (
            <Fragment key={policy.id}>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'h-10 w-10',
                  color,
                  'opacity-50 cursor-not-allowed'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDialog(policy.id);
                }}
                title={`${policy.name} (Already assigned)`}
              >
                <Icon className="h-5 w-5" />
              </Button>
              <AlertDialog open={showDialog === policy.id} onOpenChange={(open) => !open && setShowDialog(null)}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Insurance already assigned</AlertDialogTitle>
                    <AlertDialogDescription>
                      {policy.name} is already assigned and cannot be assigned again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setShowDialog(null)}>
                      OK
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Fragment>
          );
        }

        return (
          <Button
            key={policy.id}
            variant="ghost"
            size="icon"
            className={cn(
              'h-10 w-10',
              color,
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) {
                onAssignPolicy(policy.id);
              }
            }}
            disabled={disabled}
            title={policy.name}
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

