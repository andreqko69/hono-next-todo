import { Hono } from 'hono';

import todo from '@/server/features/todo/route';

const app = new Hono().basePath('/api');

app.route('/todo', todo);

export type AppType = typeof app;

export default app;
