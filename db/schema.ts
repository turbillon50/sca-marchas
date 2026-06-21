import {
  pgTable,
  serial,
  text,
  integer,
  numeric,
  timestamp,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

// Prefijo de tablas: sca_

export const orderStatusEnum = pgEnum("sca_order_status", [
  "recibido",
  "diagnostico",
  "cotizacion",
  "reparacion",
  "listo",
  "entregado",
  "cancelado",
]);

export const clientTypeEnum = pgEnum("sca_client_type", [
  "particular",
  "mecanico",
  "taller",
  "distribuidor",
]);

export const intakeTypeEnum = pgEnum("sca_intake_type", ["vehiculo", "pieza_suelta"]);

export const partKindEnum = pgEnum("sca_part_kind", ["marcha", "alternador", "otro"]);

export const moveTypeEnum = pgEnum("sca_move_type", ["entrada", "salida", "ajuste"]);

// --- Usuarios / técnicos -----------------------------------------------------
export const technicians = pgTable("sca_technicians", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id").unique(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  role: text("role").default("tecnico").notNull(), // tecnico | admin | cliente
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// --- Clientes / vehículos ----------------------------------------------------
export const clients = pgTable("sca_clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: clientTypeEnum("type").default("particular").notNull(),
  phone: text("phone"),
  email: text("email"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const vehicles = pgTable("sca_vehicles", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").references(() => clients.id),
  brand: text("brand"),
  model: text("model"),
  year: integer("year"),
  plates: text("plates"),
  vin: text("vin"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// --- Catálogo de piezas / refacciones ---------------------------------------
export const parts = pgTable("sca_parts", {
  id: serial("id").primaryKey(),
  sku: text("sku").unique(),
  name: text("name").notNull(),
  kind: partKindEnum("kind").default("otro").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// --- Órdenes -----------------------------------------------------------------
export const orders = pgTable("sca_orders", {
  id: serial("id").primaryKey(),
  folio: text("folio").notNull().unique(),
  clientId: integer("client_id").references(() => clients.id),
  vehicleId: integer("vehicle_id").references(() => vehicles.id),
  technicianId: integer("technician_id").references(() => technicians.id),
  intakeType: intakeTypeEnum("intake_type").default("vehiculo").notNull(),
  partKind: partKindEnum("part_kind").default("otro").notNull(),
  description: text("description"),
  status: orderStatusEnum("status").default("recibido").notNull(),
  statusHistory: jsonb("status_history").$type<{ status: string; at: string; by?: string }[]>().default([]),
  promisedAt: timestamp("promised_at", { withTimezone: true }),
  total: numeric("total", { precision: 10, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orderItems = pgTable("sca_order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  partId: integer("part_id").references(() => parts.id),
  description: text("description").notNull(),
  qty: integer("qty").default(1).notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).default("0").notNull(),
});

export const orderPhotos = pgTable("sca_order_photos", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  url: text("url").notNull(),
  stage: text("stage").default("recepcion").notNull(), // recepcion | evidencia | entrega
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// --- Cotizaciones / facturas -------------------------------------------------
export const quotations = pgTable("sca_quotations", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).default("0").notNull(),
  authorized: boolean("authorized").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const invoices = pgTable("sca_invoices", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).default("0").notNull(),
  paid: boolean("paid").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// --- Inventario --------------------------------------------------------------
export const inventory = pgTable("sca_inventory", {
  id: serial("id").primaryKey(),
  partId: integer("part_id").references(() => parts.id).notNull(),
  stock: integer("stock").default(0).notNull(),
  minStock: integer("min_stock").default(2).notNull(),
  location: text("location"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const inventoryMoves = pgTable("sca_inventory_moves", {
  id: serial("id").primaryKey(),
  partId: integer("part_id").references(() => parts.id).notNull(),
  orderId: integer("order_id").references(() => orders.id),
  type: moveTypeEnum("type").notNull(),
  qty: integer("qty").notNull(),
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// --- Proveedores / compras ---------------------------------------------------
export const suppliers = pgTable("sca_suppliers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const purchases = pgTable("sca_purchases", {
  id: serial("id").primaryKey(),
  supplierId: integer("supplier_id").references(() => suppliers.id),
  partId: integer("part_id").references(() => parts.id),
  qty: integer("qty").default(1).notNull(),
  cost: numeric("cost", { precision: 10, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// --- Calificaciones ----------------------------------------------------------
export const ratings = pgTable("sca_ratings", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  clientName: text("client_name"),
  stars: integer("stars").default(5).notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type Part = typeof parts.$inferSelect;
export type Technician = typeof technicians.$inferSelect;
