import { Hono } from 'hono';
import db from '@/server/lib/drizzle';
import { TodoTable } from '@/server/lib/drizzle/schema';

const todo = new Hono();

todo.get('/', async (c) => {
  const todos = await db.select().from(TodoTable);
  console.log('todos:', todos);




  return c.json({ todos });
});

// todo.get('/:id', (c) => {
//   const id = c.req.param('id');
//   const todo = todos.find((todo) => todo.id === Number(id));
//
//   if (!todo) {
//     return c.json({ error: 'Todo not found' }, 404);
//   }
//
//   return c.json({ todo });
// });

export default todo;
