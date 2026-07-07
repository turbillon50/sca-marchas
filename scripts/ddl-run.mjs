import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getDbUrl() {
  try {
    const env = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
    const match = env.match(/DATABASE_URL=(.+)/);
    if (match) return match[1].trim();
  } catch {}
  return process.env.DATABASE_URL;
}

const url = getDbUrl();
const sql = neon(url);

const stmts = [
  `DO $$ BEGIN CREATE TYPE sca_order_status AS ENUM ('recibido','diagnostico','cotizacion','reparacion','listo','entregado','cancelado'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE sca_client_type AS ENUM ('particular','mecanico','taller','distribuidor'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE sca_intake_type AS ENUM ('vehiculo','pieza_suelta'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE sca_part_kind AS ENUM ('marcha','alternador','otro'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE sca_move_type AS ENUM ('entrada','salida','ajuste'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `CREATE TABLE IF NOT EXISTS sca_technicians (id serial PRIMARY KEY, clerk_user_id text UNIQUE, name text NOT NULL, email text, phone text, role text NOT NULL DEFAULT 'tecnico', active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_clients (id serial PRIMARY KEY, name text NOT NULL, type sca_client_type NOT NULL DEFAULT 'particular', phone text, email text, notes text, created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_vehicles (id serial PRIMARY KEY, client_id integer REFERENCES sca_clients(id), brand text, model text, year integer, plates text, vin text, created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_parts (id serial PRIMARY KEY, sku text UNIQUE, name text NOT NULL, kind sca_part_kind NOT NULL DEFAULT 'otro', unit_price numeric(10,2) NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_orders (id serial PRIMARY KEY, folio text NOT NULL UNIQUE, client_id integer REFERENCES sca_clients(id), vehicle_id integer REFERENCES sca_vehicles(id), technician_id integer REFERENCES sca_technicians(id), intake_type sca_intake_type NOT NULL DEFAULT 'vehiculo', part_kind sca_part_kind NOT NULL DEFAULT 'otro', description text, status sca_order_status NOT NULL DEFAULT 'recibido', status_history jsonb DEFAULT '[]'::jsonb, promised_at timestamptz, total numeric(10,2) NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_order_items (id serial PRIMARY KEY, order_id integer NOT NULL REFERENCES sca_orders(id), part_id integer REFERENCES sca_parts(id), description text NOT NULL, qty integer NOT NULL DEFAULT 1, unit_price numeric(10,2) NOT NULL DEFAULT 0)`,
  `CREATE TABLE IF NOT EXISTS sca_order_photos (id serial PRIMARY KEY, order_id integer NOT NULL REFERENCES sca_orders(id), url text NOT NULL, stage text NOT NULL DEFAULT 'recepcion', created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_quotations (id serial PRIMARY KEY, order_id integer NOT NULL REFERENCES sca_orders(id), amount numeric(10,2) NOT NULL DEFAULT 0, authorized boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_invoices (id serial PRIMARY KEY, order_id integer NOT NULL REFERENCES sca_orders(id), amount numeric(10,2) NOT NULL DEFAULT 0, paid boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_inventory (id serial PRIMARY KEY, part_id integer NOT NULL REFERENCES sca_parts(id), stock integer NOT NULL DEFAULT 0, min_stock integer NOT NULL DEFAULT 2, location text, updated_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_inventory_moves (id serial PRIMARY KEY, part_id integer NOT NULL REFERENCES sca_parts(id), order_id integer REFERENCES sca_orders(id), type sca_move_type NOT NULL, qty integer NOT NULL, note text, created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_suppliers (id serial PRIMARY KEY, name text NOT NULL, phone text, email text, created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_purchases (id serial PRIMARY KEY, supplier_id integer REFERENCES sca_suppliers(id), part_id integer REFERENCES sca_parts(id), qty integer NOT NULL DEFAULT 1, cost numeric(10,2) NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS sca_ratings (id serial PRIMARY KEY, order_id integer REFERENCES sca_orders(id), client_name text, stars integer NOT NULL DEFAULT 5, comment text, created_at timestamptz NOT NULL DEFAULT now())`,
];

console.log(`→ Ejecutando ${stmts.length} sentencias DDL...`);
for (const stmt of stmts) {
  await sql.query(stmt);
}
console.log("✅ DDL completado — todas las tablas creadas.");
