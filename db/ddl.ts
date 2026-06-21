// DDL idempotente que refleja db/schema.ts. Lo ejecuta /api/setup.
// Cada entrada es una sentencia ejecutable individual por el driver HTTP de Neon.

export const SETUP_STATEMENTS: string[] = [
  // enums
  `DO $$ BEGIN CREATE TYPE sca_order_status AS ENUM ('recibido','diagnostico','cotizacion','reparacion','listo','entregado','cancelado'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE sca_client_type AS ENUM ('particular','mecanico','taller','distribuidor'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE sca_intake_type AS ENUM ('vehiculo','pieza_suelta'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE sca_part_kind AS ENUM ('marcha','alternador','otro'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE sca_move_type AS ENUM ('entrada','salida','ajuste'); EXCEPTION WHEN duplicate_object THEN null; END $$`,

  `CREATE TABLE IF NOT EXISTS sca_technicians (
    id serial PRIMARY KEY,
    clerk_user_id text UNIQUE,
    name text NOT NULL,
    email text,
    phone text,
    role text NOT NULL DEFAULT 'tecnico',
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_clients (
    id serial PRIMARY KEY,
    name text NOT NULL,
    type sca_client_type NOT NULL DEFAULT 'particular',
    phone text,
    email text,
    notes text,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_vehicles (
    id serial PRIMARY KEY,
    client_id integer REFERENCES sca_clients(id),
    brand text,
    model text,
    year integer,
    plates text,
    vin text,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_parts (
    id serial PRIMARY KEY,
    sku text UNIQUE,
    name text NOT NULL,
    kind sca_part_kind NOT NULL DEFAULT 'otro',
    unit_price numeric(10,2) NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_orders (
    id serial PRIMARY KEY,
    folio text NOT NULL UNIQUE,
    client_id integer REFERENCES sca_clients(id),
    vehicle_id integer REFERENCES sca_vehicles(id),
    technician_id integer REFERENCES sca_technicians(id),
    intake_type sca_intake_type NOT NULL DEFAULT 'vehiculo',
    part_kind sca_part_kind NOT NULL DEFAULT 'otro',
    description text,
    status sca_order_status NOT NULL DEFAULT 'recibido',
    status_history jsonb DEFAULT '[]'::jsonb,
    promised_at timestamptz,
    total numeric(10,2) NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_order_items (
    id serial PRIMARY KEY,
    order_id integer NOT NULL REFERENCES sca_orders(id),
    part_id integer REFERENCES sca_parts(id),
    description text NOT NULL,
    qty integer NOT NULL DEFAULT 1,
    unit_price numeric(10,2) NOT NULL DEFAULT 0
  )`,

  `CREATE TABLE IF NOT EXISTS sca_order_photos (
    id serial PRIMARY KEY,
    order_id integer NOT NULL REFERENCES sca_orders(id),
    url text NOT NULL,
    stage text NOT NULL DEFAULT 'recepcion',
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_quotations (
    id serial PRIMARY KEY,
    order_id integer NOT NULL REFERENCES sca_orders(id),
    amount numeric(10,2) NOT NULL DEFAULT 0,
    authorized boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_invoices (
    id serial PRIMARY KEY,
    order_id integer NOT NULL REFERENCES sca_orders(id),
    amount numeric(10,2) NOT NULL DEFAULT 0,
    paid boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_inventory (
    id serial PRIMARY KEY,
    part_id integer NOT NULL REFERENCES sca_parts(id),
    stock integer NOT NULL DEFAULT 0,
    min_stock integer NOT NULL DEFAULT 2,
    location text,
    updated_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_inventory_moves (
    id serial PRIMARY KEY,
    part_id integer NOT NULL REFERENCES sca_parts(id),
    order_id integer REFERENCES sca_orders(id),
    type sca_move_type NOT NULL,
    qty integer NOT NULL,
    note text,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_suppliers (
    id serial PRIMARY KEY,
    name text NOT NULL,
    phone text,
    email text,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_purchases (
    id serial PRIMARY KEY,
    supplier_id integer REFERENCES sca_suppliers(id),
    part_id integer REFERENCES sca_parts(id),
    qty integer NOT NULL DEFAULT 1,
    cost numeric(10,2) NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS sca_ratings (
    id serial PRIMARY KEY,
    order_id integer REFERENCES sca_orders(id),
    client_name text,
    stars integer NOT NULL DEFAULT 5,
    comment text,
    created_at timestamptz NOT NULL DEFAULT now()
  )`,
];

// Datos semilla mínimos para que el seguimiento público y los listados tengan algo real.
export const SEED_STATEMENTS: string[] = [
  `INSERT INTO sca_technicians (name, role, phone) VALUES
     ('Rigoberto','admin','+528112345678'),
     ('Marco Treviño','tecnico','+528119876543'),
     ('Hugo Salinas','tecnico','+528117654321')
   ON CONFLICT DO NOTHING`,

  `INSERT INTO sca_clients (name, type, phone) VALUES
     ('Transportes del Norte','taller','+528100000001'),
     ('Juan Pérez','particular','+528100000002'),
     ('Refaccionaria La Silla','distribuidor','+528100000003')
   ON CONFLICT DO NOTHING`,

  `INSERT INTO sca_parts (sku, name, kind, unit_price) VALUES
     ('MAR-001','Marcha 12V Nissan','marcha',1850.00),
     ('ALT-001','Alternador 90A GM','alternador',2400.00),
     ('CAR-001','Carbones marcha (juego)','otro',180.00)
   ON CONFLICT (sku) DO NOTHING`,

  `INSERT INTO sca_inventory (part_id, stock, min_stock, location)
     SELECT id, 5, 2, 'Anaquel A' FROM sca_parts WHERE sku='MAR-001'
     AND NOT EXISTS (SELECT 1 FROM sca_inventory i WHERE i.part_id = sca_parts.id)`,
  `INSERT INTO sca_inventory (part_id, stock, min_stock, location)
     SELECT id, 1, 3, 'Anaquel B' FROM sca_parts WHERE sku='ALT-001'
     AND NOT EXISTS (SELECT 1 FROM sca_inventory i WHERE i.part_id = sca_parts.id)`,

  `INSERT INTO sca_orders (folio, client_id, technician_id, intake_type, part_kind, description, status, status_history, total)
     SELECT 'SCA-2025-001',
            (SELECT id FROM sca_clients WHERE name='Transportes del Norte' LIMIT 1),
            (SELECT id FROM sca_technicians WHERE name='Marco Treviño' LIMIT 1),
            'pieza_suelta','alternador','Alternador 90A no carga',
            'reparacion',
            '[{"status":"recibido","at":"2025-01-10T09:00:00Z"},{"status":"diagnostico","at":"2025-01-10T11:00:00Z"},{"status":"reparacion","at":"2025-01-11T10:00:00Z"}]'::jsonb,
            1200.00
     WHERE NOT EXISTS (SELECT 1 FROM sca_orders WHERE folio='SCA-2025-001')`,

  `INSERT INTO sca_ratings (client_name, stars, comment) VALUES
     ('Juan P.',5,'Quedó como nuevo el alternador, rápido.'),
     ('Taller La Silla',5,'Servicio pesado confiable.'),
     ('Mario G.',4,'Buen trabajo en la marcha.')
   ON CONFLICT DO NOTHING`,
];
