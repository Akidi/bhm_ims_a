import { serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { app } from './schema';
import { items } from './items';

export const warehouses = app.table('warehouses', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // e.g., "West Broadway"
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const warehousesRelations = relations(warehouses, ({ many }) => ({
  items: many(items)
}));

// Type information for the warehouses table
export type Warehouse = InferSelectModel<typeof warehouses>;
export type NewWarehouse = InferInsertModel<typeof warehouses>;