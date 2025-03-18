import { pgTable, unique, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 40 }).notNull(),
	lastName: varchar("last_name", { length: 40 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: text("password_hash").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
	emailVerified: timestamp({ mode: 'string' }),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);
