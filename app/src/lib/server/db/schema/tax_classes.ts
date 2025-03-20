import { serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { app } from './schema';
import { items } from './items';

export const taxClasses = app.table('tax_classes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // e.g., "Standard"
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const taxClassesRelations = relations(taxClasses, ({ many }) => ({
  items: many(items)
}));

// Type information for the tax_classes table
export type TaxClass = InferSelectModel<typeof taxClasses>;
export type NewTaxClass = InferInsertModel<typeof taxClasses>;