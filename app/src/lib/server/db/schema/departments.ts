import { serial, text, timestamp } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';
import { app } from './schema';
import { items } from './items';

export const departments = app.table('departments', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // e.g., "Medical Supplies"
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  items: many(items)
}));

// Type information for the departments table
export type Department = InferSelectModel<typeof departments>;
export type NewDepartment = InferInsertModel<typeof departments>;