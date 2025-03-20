import { serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { app } from './schema';
import { items } from './items';

export const locations = app.table('locations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // e.g., "Location A"
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const locationsRelations = relations(locations, ({ many }) => ({
  items: many(items)
}));

// Type information for the locations table
export type Location = InferSelectModel<typeof locations>;
export type NewLocation = InferInsertModel<typeof locations>;