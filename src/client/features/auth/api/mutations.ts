import { z } from 'zod';

import { postApi } from '@/client/lib/fetch-api';
import { signInSchema, signUpSchema } from '@/shared/validation/auth/schema';

export const signUp = async (
  url: string,
  { arg }: { arg: z.infer<typeof signUpSchema> }
) => postApi({ url, body: arg });

export const signIn = async (
  url: string,
  { arg }: { arg: z.infer<typeof signInSchema> }
) => postApi({ url, body: arg });
