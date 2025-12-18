import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PolicyIcons } from '@/components/policies/PolicyIcons';
import { UserWithPolicies } from '@/features/users/types';
import { Policy } from '@/features/policies/types';

interface UsersTableProps {
  users: UserWithPolicies[];
  policies: Policy[];
  onAssignPolicy: (userId: string, policyId: string) => void;
  assigningPolicy: string | null;
}

function navigateToUserProfile(userId: string, navigate: ReturnType<typeof useNavigate>) {
  navigate(`/users/${userId}`);
}

export function UsersTable({ users, policies, onAssignPolicy, assigningPolicy }: UsersTableProps) {
  const navigate = useNavigate();

  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No users found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-center">Policies</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="hover:bg-muted/50">
            <TableCell>
              <img
                src={user.profileImageUrl || 'https://via.placeholder.com/64?text=No+Image'}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-16 h-16 object-cover rounded-full"
                onError={(e) => handleImageError(e, 'https://via.placeholder.com/64?text=No+Image')}
              />
            </TableCell>
            <TableCell
              className="font-medium cursor-pointer hover:text-primary"
              onClick={() => navigateToUserProfile(user.id, navigate)}
            >
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell
              className="cursor-pointer hover:text-primary"
              onClick={() => navigateToUserProfile(user.id, navigate)}
            >
              {user.email}
            </TableCell>
            <TableCell
              className="cursor-pointer hover:text-primary"
              onClick={() => navigateToUserProfile(user.id, navigate)}
            >
              {user.phoneNumber}
            </TableCell>
            <TableCell onClick={(e) => e.stopPropagation()}>
              <PolicyIcons
                policies={policies}
                onAssignPolicy={(policyId) => onAssignPolicy(user.id, policyId)}
                assigningPolicy={assigningPolicy}
                disabled={assigningPolicy !== null}
                assignedPolicyIds={user.policies.map((up) => up.policyId)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

