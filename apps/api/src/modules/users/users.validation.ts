import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(3).max(50),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  dateOfBirth: z.string().datetime(),
  address: z.string().min(1).max(500),
  phoneNumber: z.string().min(1).max(20),
  email: z.string().email(),
  profileImageUrl: z.string().url().nullable().optional(),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  dateOfBirth: z.string().datetime().optional(),
  address: z.string().min(1).max(500).optional(),
  phoneNumber: z.string().min(1).max(20).optional(),
  email: z.string().email().optional(),
  profileImageUrl: z.string().url().nullable().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

