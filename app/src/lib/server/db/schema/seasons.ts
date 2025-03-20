import { serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { app } from './schema';
import { items } from './items';

export const seasons = app.table('seasons', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // e.g., "Winter"
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const seasonsRelations = relations(seasons, ({ many }) => ({
  items: many(items)
}));

// Type information for the seasons table
export type Season = InferSelectModel<typeof seasons>;
export type NewSeason = InferInsertModel<typeof seasons>;