import { db, dbAvailable } from "@/lib/db";
import { orders, clients, ratings, inventory, parts, technicians } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

// Capa de acceso a datos: datos reales si hay DATABASE_URL, si no respaldo demo plausible.

export type TrackedOrder = {
  folio: string;
  status: string;
  description: string | null;
  partKind: string;
  client: string | null;
  promisedAt: string | null;
  history: { status: string; at: string }[];
};

const DEMO_ORDER: TrackedOrder = {
  folio: "SCA-2025-001",
  status: "reparacion",
  description: "Alternador 90A no carga",
  partKind: "alternador",
  client: "Transportes del Norte",
  promisedAt: null,
  history: [
    { status: "recibido", at: "2025-01-10T09:00:00Z" },
    { status: "diagnostico", at: "2025-01-10T11:00:00Z" },
    { status: "reparacion", at: "2025-01-11T10:00:00Z" },
  ],
};

export async function getOrderByFolio(folio: string): Promise<TrackedOrder | null> {
  const f = folio.trim().toUpperCase();
  if (!dbAvailable) {
    return f === DEMO_ORDER.folio ? DEMO_ORDER : null;
  }
  const rows = await db.select().from(orders).where(eq(orders.folio, f)).limit(1);
  const o = rows[0];
  if (!o) return null;
  let client: string | null = null;
  if (o.clientId) {
    const c = await db.select().from(clients).where(eq(clients.id, o.clientId)).limit(1);
    client = c[0]?.name ?? null;
  }
  return {
    folio: o.folio,
    status: o.status,
    description: o.description,
    partKind: o.partKind,
    client,
    promisedAt: o.promisedAt ? o.promisedAt.toISOString() : null,
    history: (o.statusHistory as { status: string; at: string }[] | null) ?? [],
  };
}

export type RatingItem = { clientName: string; stars: number; comment: string };

const DEMO_RATINGS: RatingItem[] = [
  { clientName: "Juan P.", stars: 5, comment: "Quedó como nuevo el alternador, rápido." },
  { clientName: "Taller La Silla", stars: 5, comment: "Servicio pesado confiable." },
  { clientName: "Mario G.", stars: 4, comment: "Buen trabajo en la marcha." },
];

export async function getRatings(): Promise<RatingItem[]> {
  if (!dbAvailable) return DEMO_RATINGS;
  const rows = await db.select().from(ratings).orderBy(desc(ratings.createdAt)).limit(6);
  if (!rows.length) return DEMO_RATINGS;
  return rows.map((r) => ({ clientName: r.clientName ?? "Cliente", stars: r.stars, comment: r.comment ?? "" }));
}

export type AdminKpis = {
  activeOrders: number;
  billingToday: number;
  lowStock: number;
  activeTechs: number;
  week: number[];
};

const DEMO_KPIS: AdminKpis = {
  activeOrders: 7,
  billingToday: 8450,
  lowStock: 2,
  activeTechs: 3,
  week: [4, 6, 3, 8, 5, 7, 9],
};

export async function getAdminKpis(): Promise<AdminKpis> {
  if (!dbAvailable) return DEMO_KPIS;
  try {
    const allOrders = await db.select().from(orders);
    const active = allOrders.filter((o) => !["entregado", "cancelado"].includes(o.status)).length;
    const inv = await db.select().from(inventory);
    const low = inv.filter((i) => i.stock <= i.minStock).length;
    const techs = await db.select().from(technicians).where(eq(technicians.active, true));
    const billing = allOrders.reduce((s, o) => s + parseFloat(o.total || "0"), 0);
    return {
      activeOrders: active,
      billingToday: billing,
      lowStock: low,
      activeTechs: techs.length,
      week: DEMO_KPIS.week,
    };
  } catch {
    return DEMO_KPIS;
  }
}

export type OrderRow = {
  id: number;
  folio: string;
  client: string | null;
  status: string;
  partKind: string;
  total: string;
  createdAt: string;
};

const DEMO_ORDERS: OrderRow[] = [
  { id: 1, folio: "SCA-2025-001", client: "Transportes del Norte", status: "reparacion", partKind: "alternador", total: "1200.00", createdAt: "2025-01-10" },
  { id: 2, folio: "SCA-2025-002", client: "Juan Pérez", status: "listo", partKind: "marcha", total: "1850.00", createdAt: "2025-01-12" },
  { id: 3, folio: "SCA-2025-003", client: "Refaccionaria La Silla", status: "diagnostico", partKind: "alternador", total: "0.00", createdAt: "2025-01-14" },
  { id: 4, folio: "SCA-2025-004", client: "Juan Pérez", status: "entregado", partKind: "marcha", total: "980.00", createdAt: "2025-01-09" },
];

export async function getOrders(): Promise<OrderRow[]> {
  if (!dbAvailable) return DEMO_ORDERS;
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(100);
  if (!rows.length) return DEMO_ORDERS;
  const clientRows = await db.select().from(clients);
  const cmap = new Map(clientRows.map((c) => [c.id, c.name]));
  return rows.map((o) => ({
    id: o.id,
    folio: o.folio,
    client: o.clientId ? cmap.get(o.clientId) ?? null : null,
    status: o.status,
    partKind: o.partKind,
    total: o.total,
    createdAt: o.createdAt.toISOString().slice(0, 10),
  }));
}

export type ClientRow = { id: number; name: string; type: string; phone: string | null; orders: number };

const DEMO_CLIENTS: ClientRow[] = [
  { id: 1, name: "Transportes del Norte", type: "taller", phone: "+528100000001", orders: 12 },
  { id: 2, name: "Juan Pérez", type: "particular", phone: "+528100000002", orders: 3 },
  { id: 3, name: "Refaccionaria La Silla", type: "distribuidor", phone: "+528100000003", orders: 27 },
];

export async function getClients(): Promise<ClientRow[]> {
  if (!dbAvailable) return DEMO_CLIENTS;
  const rows = await db.select().from(clients).orderBy(desc(clients.createdAt)).limit(200);
  if (!rows.length) return DEMO_CLIENTS;
  const allOrders = await db.select().from(orders);
  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    type: c.type,
    phone: c.phone,
    orders: allOrders.filter((o) => o.clientId === c.id).length,
  }));
}

export type InventoryRow = { id: number; name: string; sku: string | null; stock: number; minStock: number; location: string | null };

const DEMO_INVENTORY: InventoryRow[] = [
  { id: 1, name: "Marcha 12V Nissan", sku: "MAR-001", stock: 5, minStock: 2, location: "Anaquel A" },
  { id: 2, name: "Alternador 90A GM", sku: "ALT-001", stock: 1, minStock: 3, location: "Anaquel B" },
  { id: 3, name: "Carbones marcha (juego)", sku: "CAR-001", stock: 14, minStock: 5, location: "Cajón 3" },
];

export async function getInventory(): Promise<InventoryRow[]> {
  if (!dbAvailable) return DEMO_INVENTORY;
  const inv = await db.select().from(inventory);
  if (!inv.length) return DEMO_INVENTORY;
  const partRows = await db.select().from(parts);
  const pmap = new Map(partRows.map((p) => [p.id, p]));
  return inv.map((i) => {
    const p = pmap.get(i.partId);
    return {
      id: i.id,
      name: p?.name ?? "Pieza",
      sku: p?.sku ?? null,
      stock: i.stock,
      minStock: i.minStock,
      location: i.location,
    };
  });
}

export type TechRow = { id: number; name: string; role: string; active: number };

const DEMO_TECHS: TechRow[] = [
  { id: 1, name: "Marco Treviño", role: "tecnico", active: 3 },
  { id: 2, name: "Hugo Salinas", role: "tecnico", active: 2 },
  { id: 3, name: "Rigoberto", role: "admin", active: 0 },
];

export async function getTechnicians(): Promise<TechRow[]> {
  if (!dbAvailable) return DEMO_TECHS;
  const rows = await db.select().from(technicians);
  if (!rows.length) return DEMO_TECHS;
  const allOrders = await db.select().from(orders);
  return rows.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.role,
    active: allOrders.filter((o) => o.technicianId === t.id && !["entregado", "cancelado"].includes(o.status)).length,
  }));
}
