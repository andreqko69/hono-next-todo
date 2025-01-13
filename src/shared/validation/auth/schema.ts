import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { users } from '@/server/features/user/schema';
import { AuthErrorMessage } from '@/shared/validation/auth/constants';

export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email(AuthErrorMessage.InvalidEmailFormat).trim(),
  firstName: z.string().min(2, AuthErrorMessage.FirstNameIsTooShort).trim(),
  lastName: z.string().min(2, AuthErrorMessage.LastNameIsTooShort).trim(),
});

const passwordSchema = z
  .string()
  .min(8, AuthErrorMessage.PasswordMustBeAtLeast8Characters);

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
    terms: z.boolean().refine((data) => data, {
      message: AuthErrorMessage.YouMustAcceptTheTermsAndConditions,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AuthErrorMessage.PasswordsDoNotMatch,
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  email: z
    .string()
    .email(AuthErrorMessage.InvalidEmailFormat)
    .toLowerCase()
    .trim(),
  password: z.string().min(6, AuthErrorMessage.PasswordIsRequired),
  rememberMe: z.boolean().optional().default(false),
});

export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .email(AuthErrorMessage.InvalidEmailFormat)
    .toLowerCase()
    .trim(),
});

export const passwordResetSchema = z
  .object({
    token: z.string(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AuthErrorMessage.PasswordsDoNotMatch,
    path: ['confirmPassword'],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type PasswordResetRequestData = z.infer<
  typeof passwordResetRequestSchema
>;
export type PasswordResetData = z.infer<typeof passwordResetSchema>;
