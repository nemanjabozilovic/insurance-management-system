import { useParams, useNavigate } from 'react-router-dom';
import { useUser, useUpdateProfileImage, useUpdateUser } from '@/features/users/hooks';
import { useRemovePolicy } from '@/features/policies/hooks';
import { UserDetailsCard } from '@/components/users/UserDetailsCard';
import { UserForm } from '@/components/users/UserForm';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UpdateUserInput } from '@/features/users/api';
import { format } from 'date-fns';

export function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser(id || '');
  const updateProfileImage = useUpdateProfileImage();
  const updateUser = useUpdateUser();
  const removePolicy = useRemovePolicy();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    try {
      setUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        await updateProfileImage.mutateAsync({ id, imageUrl: base64String });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setUploading(false);
      alert(error instanceof Error ? error.message : 'Failed to upload image');
    }
  };

  const handleRemovePolicy = async (policyId: string) => {
    if (!id) return;
    try {
      await removePolicy.mutateAsync({ userId: id, policyId });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to remove policy';
      alert(message);
      console.error('Remove policy error:', error);
    }
  };

  const handleUpdateUser = async (data: UpdateUserInput) => {
    if (!id) return;
    try {
      await updateUser.mutateAsync({ id, data });
      setIsEditDialogOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update user';
      alert(message);
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading user details...</div>;
  }

  if (error || !user) {
    return (
      <div className="text-center py-12 text-destructive">
        <p>Error loading user: {error instanceof Error ? error.message : 'User not found'}</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">
          Back to Users
        </button>
      </div>
    );
  }

  const initialFormData = user
    ? {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: format(new Date(user.dateOfBirth), 'yyyy-MM-dd'),
        address: user.address,
        phoneNumber: user.phoneNumber,
        email: user.email,
        profileImageUrl: user.profileImageUrl || '',
      }
    : undefined;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
          ← Back to Users
        </button>
        <Button onClick={() => setIsEditDialogOpen(true)} variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit User
        </Button>
      </div>
      <UserDetailsCard
        user={user}
        onImageClick={handleImageClick}
        onRemovePolicy={handleRemovePolicy}
        uploading={uploading}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {initialFormData && (
            <UserForm
              initialData={initialFormData}
              onSubmit={handleUpdateUser}
              onCancel={() => setIsEditDialogOpen(false)}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

