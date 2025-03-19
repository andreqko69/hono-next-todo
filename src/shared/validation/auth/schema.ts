import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

import { profiles, users } from '@/server/features/user/schema';
import { AuthErrorMessages } from '@/shared/validation/auth/constants';

const insertUserSchemaFragment = createInsertSchema(users, {
  email: z.string().email(AuthErrorMessages.InvalidEmailFormat).trim(),
});

const insertProfileSchemaFragment = createInsertSchema(profiles, {
  firstName: z.string().min(2, AuthErrorMessages.FirstNameIsTooShort).trim(),
  lastName: z.string().min(2, AuthErrorMessages.LastNameIsTooShort).trim(),
});

export const insertUserSchema = insertUserSchemaFragment.merge(
  insertProfileSchemaFragment
);

const passwordSchema = z
  .string()
  .min(8, AuthErrorMessages.PasswordMustBeAtLeast8Characters);

export const signUpSchema = insertUserSchema
  .omit({
    id: true,
    userId: true,
    passwordHash: true,
    createdAt: true,
    deletedAt: true,
  })
  .extend({
    password: passwordSchema,
    confirmPassword: z.string(),
    terms: z.boolean().refine((data) => data, {
      message: AuthErrorMessages.YouMustAcceptTheTermsAndConditions,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AuthErrorMessages.PasswordsDoNotMatch,
    path: ['confirmPassword'],
  });

export const signInSchema = insertUserSchema
  .pick({
    email: true,
  })
  .extend({
    password: passwordSchema,
  });

export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .email(AuthErrorMessages.InvalidEmailFormat)
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
    message: AuthErrorMessages.PasswordsDoNotMatch,
    path: ['confirmPassword'],
  });

export type SignUpData = z.infer<typeof signUpSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type PasswordResetRequestData = z.infer<
  typeof passwordResetRequestSchema
>;
export type PasswordResetData = z.infer<typeof passwordResetSchema>;
