import { useUsers, useCreateUser } from '@/features/users/hooks';
import { usePolicies, useAssignPolicy } from '@/features/policies/hooks';
import { UsersTable } from '@/components/users/UsersTable';
import { UserForm } from '@/components/users/UserForm';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CreateUserInput, UpdateUserInput } from '@/features/users/api';

export function UsersListPage() {
  const { data: users = [], isLoading: usersLoading, error: usersError } = useUsers();
  const { data: policies = [], isLoading: policiesLoading } = usePolicies();
  const assignPolicy = useAssignPolicy();
  const createUser = useCreateUser();
  const [assigningPolicy, setAssigningPolicy] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [errorDialog, setErrorDialog] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const handleAssignPolicy = async (userId: string, policyId: string) => {
    try {
      setAssigningPolicy(`${userId}-${policyId}`);
      await assignPolicy.mutateAsync({ userId, policyId });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to assign policy';
      setErrorDialog({ open: true, message });
    } finally {
      setAssigningPolicy(null);
    }
  };

  const handleCreateUser = async (data: CreateUserInput | UpdateUserInput) => {
    try {
      await createUser.mutateAsync(data as CreateUserInput);
      setIsCreateDialogOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create user';
      alert(message);
    }
  };

  if (usersLoading || policiesLoading) {
    return <div className="text-center py-12">Loading users...</div>;
  }

  if (usersError) {
    return (
      <div className="text-center py-12 text-destructive">
        <p>Error loading users: {usersError instanceof Error ? usersError.message : 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Users</h2>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      <UsersTable
        users={users}
        policies={policies}
        onAssignPolicy={handleAssignPolicy}
        assigningPolicy={assigningPolicy}
      />
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <UserForm
            onSubmit={handleCreateUser}
            onCancel={() => setIsCreateDialogOpen(false)}
            isEditing={false}
          />
        </DialogContent>
      </Dialog>
      <AlertDialog open={errorDialog.open} onOpenChange={(open) => setErrorDialog({ open, message: errorDialog.message })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
              {errorDialog.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setErrorDialog({ open: false, message: '' })}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

