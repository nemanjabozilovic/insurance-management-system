import { format } from 'date-fns';
import { Trash2, Upload } from 'lucide-react';
import { UserWithPolicies } from '@/features/users/types';
import { Button } from '@/components/ui/button';
import { handleImageError } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface UserDetailsCardProps {
  user: UserWithPolicies;
  onImageClick: () => void;
  onRemovePolicy: (policyId: string) => void;
  uploading: boolean;
}

export function UserDetailsCard({ user, onImageClick, onRemovePolicy, uploading }: UserDetailsCardProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="relative">
            <img
              src={user.profileImageUrl || 'https://via.placeholder.com/150?text=No+Image'}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-32 h-32 object-cover rounded-full border-4 border-primary cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onImageClick}
              onError={(e) => handleImageError(e)}
            />
            <div 
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90"
              onClick={onImageClick}
            >
              <Upload className="h-4 w-4" />
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">Uploading...</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">
              {user.firstName} {user.lastName}
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Username:</span> {user.username}
              </div>
              <div>
                <span className="font-medium">Email:</span>{' '}
                <a
                  href={`mailto:${user.email}`}
                  className="text-primary hover:underline cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {user.email}
                </a>
              </div>
              <div>
                <span className="font-medium">Phone:</span>{' '}
                <a
                  href={`tel:${user.phoneNumber}`}
                  className="text-primary hover:underline cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {user.phoneNumber}
                </a>
              </div>
              <div>
                <span className="font-medium">Date of Birth:</span>{' '}
                {format(new Date(user.dateOfBirth), 'MMM dd, yyyy')}
              </div>
              <div>
                <span className="font-medium">Address:</span> {user.address}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Assigned Policies</h3>
          {!user.policies || user.policies.length === 0 ? (
            <p className="text-muted-foreground">No policies assigned yet.</p>
          ) : (
            <div className="space-y-3">
              {user.policies.map((userPolicy) => (
                <div
                  key={userPolicy.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold">{userPolicy.policy?.name || 'Unknown Policy'}</h4>
                    <p className="text-sm text-muted-foreground">{userPolicy.policy?.shortDescription || ''}</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Monthly Premium:</span> ${Number(userPolicy.policy?.monthlyPremium || 0).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Assigned: {format(new Date(userPolicy.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Policy</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove {userPolicy.policy?.name || 'this policy'} from {user.firstName}{' '}
                          {user.lastName}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            const policyIdToRemove = userPolicy.policyId || userPolicy.policy?.id;
                            if (policyIdToRemove) {
                              onRemovePolicy(policyIdToRemove);
                            }
                          }}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

