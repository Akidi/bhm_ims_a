import { serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { app } from './schema';
import { items } from './items';

export const vendors = app.table('vendors', {
  id: serial('id').primaryKey(),
  vendorId: text('vendor_id').notNull().unique(), // e.g., "VEND001"
  name: text('name').notNull(), // e.g., "ED LINDSEY MEDICAL SUPPLY"
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const vendorsRelations = relations(vendors, ({ many }) => ({
  items: many(items)
}));

// Type information for the vendors table
export type Vendor = InferSelectModel<typeof vendors>;
export type NewVendor = InferInsertModel<typeof vendors>;