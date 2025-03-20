import { serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { app } from './schema';
import { items } from './items';

export const brands = app.table('brands', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // e.g., "MediBrand"
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const brandsRelations = relations(brands, ({ many }) => ({
  items: many(items)
}));

// Type information for the brands table
export type Brand = InferSelectModel<typeof brands>;
export type NewBrand = InferInsertModel<typeof brands>;