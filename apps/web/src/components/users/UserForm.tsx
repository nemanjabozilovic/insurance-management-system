import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CreateUserInput, UpdateUserInput } from '@/features/users/api';

const userSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(1, 'Address is required').max(500),
  phoneNumber: z.string().min(1, 'Phone number is required').max(20),
  email: z.string().email('Invalid email address'),
  profileImageUrl: z.string().url().nullable().optional().or(z.literal('')),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: CreateUserInput | UpdateUserInput) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

export function UserForm({ initialData, onSubmit, onCancel, isEditing = false }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      username: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address: '',
      phoneNumber: '',
      email: '',
      profileImageUrl: '',
    },
  });

  const handleFormSubmit = async (data: UserFormData) => {
    if (isEditing) {
      const submitData: UpdateUserInput = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        profileImageUrl: data.profileImageUrl || null,
      };
      await onSubmit(submitData);
    } else {
      const submitData: CreateUserInput = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        address: data.address,
        phoneNumber: data.phoneNumber,
        email: data.email,
        profileImageUrl: data.profileImageUrl || null,
      };
      await onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            {...register('username')}
            disabled={isEditing}
            placeholder="jdoe"
          />
          {errors.username && (
            <p className="text-sm text-destructive">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          {...register('dateOfBirth')}
        />
        {errors.dateOfBirth && (
          <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          {...register('address')}
          placeholder="123 Main St, City, State ZIP"
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          {...register('phoneNumber')}
          placeholder="+1-555-0100"
        />
        {errors.phoneNumber && (
          <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="profileImageUrl">Profile Image URL (optional)</Label>
        <Input
          id="profileImageUrl"
          type="url"
          {...register('profileImageUrl')}
          placeholder="https://example.com/image.jpg"
        />
        {errors.profileImageUrl && (
          <p className="text-sm text-destructive">{errors.profileImageUrl.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </form>
  );
}

