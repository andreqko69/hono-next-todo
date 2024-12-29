import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const TodoTable = pgTable('todo', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
});
