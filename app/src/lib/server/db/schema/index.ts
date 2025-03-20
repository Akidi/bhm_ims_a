import { locations } from './locations';
import { categories } from './categories';
import { vendors } from './vendors';
import { warehouses } from './warehouses';
import { brands } from './brands';
import { taxClasses } from './tax_classes';
import { departments } from './departments';
import { seasons } from './seasons';
import { items } from './items';

// Export types for easy access
export type { Location, NewLocation } from './locations';
export type { Category, NewCategory } from './categories';
export type { Vendor, NewVendor } from './vendors';
export type { Warehouse, NewWarehouse } from './warehouses';
export type { Brand, NewBrand } from './brands';
export type { TaxClass, NewTaxClass } from './tax_classes';
export type { Department, NewDepartment } from './departments';
export type { Season, NewSeason } from './seasons';
export type { Item, NewItem } from './items';

// Export all tables in a single object
export const tables = {
  locations,
  categories,
  vendors,
  warehouses,
  brands,
  taxClasses,
  departments,
  seasons,
  items
};