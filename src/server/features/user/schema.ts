import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: varchar('first_name', { length: 40 }).notNull(),
  lastName: varchar('last_name', { length: 40 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export type Users = typeof users;
export type DbUser = typeof users.$inferSelect;
export type DbUserInsert = typeof users.$inferInsert;
