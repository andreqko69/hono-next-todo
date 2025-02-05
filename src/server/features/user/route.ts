import { Hono } from 'hono';

const user = new Hono();

user.get('/:userId', async () => {
  console.log('Get user');
});

export default user;
