import { Hono } from 'hono';

const user = new Hono();

user.get('/:userId', async (c) => {
  console.log('Get user');
});

export default user;
