import { serial, text, integer, timestamp, numeric, boolean } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { app } from './schema';
import { locations } from './locations';
import { categories } from './categories';
import { vendors } from './vendors';
import { warehouses } from './warehouses';
import { brands } from './brands';
import { taxClasses } from './tax_classes';
import { departments } from './departments';
import { seasons } from './seasons';

export const items = app.table('items', {
  id: serial('id').primaryKey(),
  locationId: integer('location_id').notNull().references(() => locations.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'set null' }),
  vendorId: integer('vendor_id').references(() => vendors.id, { onDelete: 'set null' }),
  warehouseId: integer('warehouse_id').references(() => warehouses.id, { onDelete: 'set null' }),
  brandId: integer('brand_id').references(() => brands.id, { onDelete: 'set null' }),
  taxClassId: integer('tax_class_id').references(() => taxClasses.id, { onDelete: 'set null' }),
  departmentId: integer('department_id').references(() => departments.id, { onDelete: 'set null' }),
  seasonId: integer('season_id').references(() => seasons.id, { onDelete: 'set null' }),
  systemId: text('system_id'),
  upc: text('upc'),
  ean: text('ean'),
  customSku: text('custom_sku'),
  manufacturerSku: text('manufacturer_sku'),
  description: text('description').notNull(),
  quantity: integer('quantity').notNull().default(0),
  price: numeric('price', { precision: 10, scale: 2 }),
  tax: numeric('tax', { precision: 10, scale: 2 }),
  publishToEcom: boolean('publish_to_ecom'),
  msrp: numeric('msrp', { precision: 10, scale: 2 }),
  defaultCost: numeric('default_cost', { precision: 10, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const itemsRelations = relations(items, ({ one }) => ({
  location: one(locations, {
    fields: [items.locationId],
    references: [locations.id]
  }),
  category: one(categories, {
    fields: [items.categoryId],
    references: [categories.id]
  }),
  vendor: one(vendors, {
    fields: [items.vendorId],
    references: [vendors.id]
  }),
  warehouse: one(warehouses, {
    fields: [items.warehouseId],
    references: [warehouses.id]
  }),
  brand: one(brands, {
    fields: [items.brandId],
    references: [brands.id]
  }),
  taxClass: one(taxClasses, {
    fields: [items.taxClassId],
    references: [taxClasses.id]
  }),
  department: one(departments, {
    fields: [items.departmentId],
    references: [departments.id]
  }),
  season: one(seasons, {
    fields: [items.seasonId],
    references: [seasons.id]
  })
}));

// Type information for the items table
export type Item = InferSelectModel<typeof items>;
export type NewItem = InferInsertModel<typeof items>;