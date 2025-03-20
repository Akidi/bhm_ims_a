import { app } from "./schema";
import { text, integer } from "drizzle-orm/pg-core";

export const user = app.table('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;