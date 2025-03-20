import { serial, text, integer, timestamp, pgTable } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { app } from './schema';
import { items } from './items';

export const categories = app.table('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(), // e.g., "Gloves", "Surgical"
  parentId: integer('parent_id'), // Self-referential for subcategories
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const categoriesRelations = relations(categories, ({ many, one }) => ({
  items: many(items),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'subcategories'
  }),
  subcategories: many(categories, { relationName: 'subcategories' })
}));

// Type information for the categories table
export type Category = InferSelectModel<typeof categories>;
export type NewCategory = InferInsertModel<typeof categories>;