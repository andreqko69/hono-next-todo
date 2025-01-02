import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { users } from '@/server/features/user/schema';

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email('Invalid email format').trim(),
  firstName: z.string().min(2, 'First name too short').trim(),
  lastName: z.string().min(2, 'Last name too short').trim(),
});

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters');

export const signUpSchema = insertUserSchema
  .omit({
    id: true,
    passwordHash: true,
    createdAt: true,
    isActive: true,
  })
  .extend({
    password: passwordSchema,
    confirmPassword: z.string(),
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email('Invalid email format').toLowerCase().trim(),
});

export const passwordResetSchema = z
  .object({
    token: z.string(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type PasswordResetRequestData = z.infer<
  typeof passwordResetRequestSchema
>;
export type PasswordResetData = z.infer<typeof passwordResetSchema>;
