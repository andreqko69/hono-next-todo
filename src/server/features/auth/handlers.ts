import { Hono } from 'hono';

import authService from '@/server/features/auth/service';
import { signInSchema, signUpSchema } from '@/shared/validation/auth/schema';

const createAuthHandlers = () => {
  const auth = new Hono();

  auth.post('/login', async (c) => {
    const body = await c.req.json();
    const parsedBody = signInSchema.parse(body);

    return c.text('Hello');
  });

  auth.post('/register', async (c) => {
    const body = await c.req.json();
    const parsedBody = signUpSchema.parse(body);

    await authService.signUp(parsedBody);

    return c.json({ success: true }, 200);
  });

  auth.post('/logout', async () => {
    console.log('Register');
  });

  return auth;
};

export default createAuthHandlers;
