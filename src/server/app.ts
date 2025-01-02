import { Hono } from 'hono';
import { z } from 'zod';

import createAuthHandlers from '@/server/features/auth/handlers';
import user from '@/server/features/user/route';
import { AppError } from '@/server/utils/errors';

const app = new Hono().basePath('/api/v1');

const auth = createAuthHandlers();

app.route('/auth', auth);
app.route('/user', user);

app.onError((err, c) => {
  console.error(`[${new Date().toISOString()}]`, err);
  // handle zod validation errors
  if (err instanceof z.ZodError) {
    return c.json(
      {
        success: false,
        error: 'Validation error',
        details: err.errors.map((e) => ({
          error: e.message,
          fieldName: e.path.join('.'),
        })),
      },
      400
    );
  }

  // Handle custom app errors
  if (err instanceof AppError) {
    return c.json(
      {
        success: false,
        error: err.message,
        details: err.details,
      },
      err.statusCode
    );
  }

  // Handle database unique constraint violations
  if ('code' in err && err.code === '23505') {
    // PostgreSQL unique violation
    return c.json(
      {
        success: false,
        error: 'Resource already exists',
      },
      409
    );
  }

  return c.json(
    {
      success: false,
      error: 'Internal server error',
    },
    500
  );
});

export type AppType = typeof app;

export default app;
