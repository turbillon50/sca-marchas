// Seed completo: 12 clientes, 20 órdenes, 25 refacciones, 4 técnicos
// Ejecutar: node scripts/seed-full.mjs
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Leer DATABASE_URL del .env.local
function getDbUrl() {
  try {
    const env = readFileSync(resolve(__dirname, "../.env.local"), "utf-8");
    const match = env.match(/DATABASE_URL=(.+)/);
    if (match) return match[1].trim();
  } catch {}
  return process.env.DATABASE_URL;
}

const url = getDbUrl();
if (!url) { console.error("No DATABASE_URL"); process.exit(1); }

const sql = neon(url);

async function run() {
  console.log("→ Conectado a Neon, iniciando seed...");

  // Técnicos
  await sql`
    INSERT INTO sca_technicians (name, email, phone, role, active) VALUES
      ('Rigoberto Garza',    'rigo@sca.mx',   '+52 81 1234 5678', 'admin',    true),
      ('Marco Treviño',      'marco@sca.mx',  '+52 81 1987 6543', 'tecnico',  true),
      ('Hugo Salinas',       'hugo@sca.mx',   '+52 81 2765 4321', 'tecnico',  true),
      ('Eduardo Ramírez',    'edu@sca.mx',    '+52 81 3876 5432', 'tecnico',  true)
    ON CONFLICT DO NOTHING
  `;
  console.log("✓ Técnicos");

  // Clientes (12: algunos mecánicos que traen piezas)
  await sql`
    INSERT INTO sca_clients (name, type, phone, email, notes) VALUES
      ('Transportes del Norte S.A.',  'taller',        '+52 81 8000 0001', 'ventas@transportes.mx',   'Flota de tractos, viene seguido'),
      ('Juan Pérez Garza',            'particular',    '+52 81 8000 0002', null,                       null),
      ('Refaccionaria La Silla',      'distribuidor',  '+52 81 8000 0003', 'compras@lasilla.mx',       'Paga a 30 días'),
      ('Mecánico Martínez',           'mecanico',      '+52 81 8000 0004', null,                       'Trae marchas y alternadores de sus clientes'),
      ('Carlos Hdez Autoservicio',    'taller',        '+52 81 8000 0005', 'carlos@autoservicio.mx',   null),
      ('Ana González',                'particular',    '+52 81 8000 0006', null,                       null),
      ('Taller El Bicho',             'mecanico',      '+52 81 8000 0007', null,                       'Especializado en Fords y GMs'),
      ('Mario Villarreal',            'particular',    '+52 81 8000 0008', null,                       null),
      ('Fletes Monterrey Express',    'taller',        '+52 81 8000 0009', 'ops@fletesmty.mx',         'Camiones de reparto, urgente siempre'),
      ('Mecánico Torres',             'mecanico',      '+52 81 8000 0010', null,                       'Lleva piezas de distintos coches'),
      ('Roberto Morales',             'particular',    '+52 81 8000 0011', null,                       null),
      ('Gruero Ramírez Express',      'taller',        '+52 81 8000 0012', null,                       'Grúas y camiones de carga')
    ON CONFLICT DO NOTHING
  `;
  console.log("✓ Clientes");

  // 25 Refacciones
  await sql`
    INSERT INTO sca_parts (sku, name, kind, unit_price) VALUES
      ('MAR-001', 'Marcha 12V Nissan',             'marcha',     1850.00),
      ('MAR-002', 'Marcha 12V GM Silverado',       'marcha',     2100.00),
      ('MAR-003', 'Marcha 24V Freightliner',       'marcha',     4200.00),
      ('MAR-004', 'Marcha 12V Ford F-150',         'marcha',     1950.00),
      ('MAR-005', 'Marcha 12V Toyota Hilux',       'marcha',     1750.00),
      ('MAR-006', 'Marcha 12V Honda Accord',       'marcha',     1650.00),
      ('MAR-007', 'Marcha 24V International',      'marcha',     4800.00),
      ('MAR-008', 'Marcha 12V Dodge Ram',          'marcha',     2050.00),
      ('ALT-001', 'Alternador 90A GM',             'alternador', 2400.00),
      ('ALT-002', 'Alternador 120A Ford',          'alternador', 2800.00),
      ('ALT-003', 'Alternador 150A Kenworth',      'alternador', 5500.00),
      ('ALT-004', 'Alternador 90A Nissan',         'alternador', 2200.00),
      ('ALT-005', 'Alternador 100A Toyota',        'alternador', 2350.00),
      ('ALT-006', 'Alternador 120A Dodge',         'alternador', 2700.00),
      ('ALT-007', 'Alternador 180A Freightliner',  'alternador', 6200.00),
      ('CAR-001', 'Carbones marcha (juego)',        'otro',        180.00),
      ('CAR-002', 'Carbones alternador (juego)',    'otro',        220.00),
      ('ROD-001', 'Rodamiento marcha delantera',   'otro',        320.00),
      ('ROD-002', 'Rodamiento alternador',         'otro',        280.00),
      ('REG-001', 'Regulador alternador interno',  'otro',        450.00),
      ('REC-001', 'Rectificador diodo (puente)',   'otro',        380.00),
      ('BUS-001', 'Bujes marcha (juego)',           'otro',        150.00),
      ('SOP-001', 'Soporte marcha universal',      'otro',        220.00),
      ('KIT-001', 'Kit reparación marcha básico',  'otro',        650.00),
      ('KIT-002', 'Kit reparación alternador',     'otro',        890.00)
    ON CONFLICT (sku) DO NOTHING
  `;
  console.log("✓ Refacciones (25)");

  // Inventario para las 25 refacciones (3-4 bajo mínimo)
  await sql`
    INSERT INTO sca_inventory (part_id, stock, min_stock, location)
    SELECT p.id,
      CASE p.sku
        WHEN 'MAR-001' THEN 6
        WHEN 'MAR-002' THEN 4
        WHEN 'MAR-003' THEN 2
        WHEN 'MAR-004' THEN 1  -- BAJO
        WHEN 'MAR-005' THEN 5
        WHEN 'MAR-006' THEN 3
        WHEN 'MAR-007' THEN 0  -- AGOTADO/BAJO
        WHEN 'MAR-008' THEN 4
        WHEN 'ALT-001' THEN 1  -- BAJO
        WHEN 'ALT-002' THEN 5
        WHEN 'ALT-003' THEN 2
        WHEN 'ALT-004' THEN 6
        WHEN 'ALT-005' THEN 3
        WHEN 'ALT-006' THEN 4
        WHEN 'ALT-007' THEN 1  -- BAJO
        WHEN 'CAR-001' THEN 12
        WHEN 'CAR-002' THEN 10
        WHEN 'ROD-001' THEN 8
        WHEN 'ROD-002' THEN 7
        WHEN 'REG-001' THEN 5
        WHEN 'REC-001' THEN 4
        WHEN 'BUS-001' THEN 15
        WHEN 'SOP-001' THEN 6
        WHEN 'KIT-001' THEN 3
        WHEN 'KIT-002' THEN 2
      END,
      CASE p.sku
        WHEN 'MAR-003' THEN 1 WHEN 'MAR-007' THEN 1
        WHEN 'ALT-003' THEN 1 WHEN 'ALT-007' THEN 1
        ELSE 3
      END,
      CASE
        WHEN p.sku LIKE 'MAR%' THEN 'Anaquel A'
        WHEN p.sku LIKE 'ALT%' THEN 'Anaquel B'
        ELSE 'Cajón 3'
      END
    FROM sca_parts p
    WHERE NOT EXISTS (SELECT 1 FROM sca_inventory i WHERE i.part_id = p.id)
  `;
  console.log("✓ Inventario");

  // 20 Órdenes con varios estatus
  // Primero obtenemos los IDs reales
  const techs = await sql`SELECT id, name FROM sca_technicians ORDER BY id`;
  const cls = await sql`SELECT id, name FROM sca_clients ORDER BY id`;

  const tRigo  = techs.find(t => t.name.startsWith('Rigoberto'))?.id;
  const tMarco = techs.find(t => t.name.startsWith('Marco'))?.id;
  const tHugo  = techs.find(t => t.name.startsWith('Hugo'))?.id;
  const tEdu   = techs.find(t => t.name.startsWith('Eduardo'))?.id;

  const cTransportes = cls.find(c => c.name.startsWith('Transportes del Norte'))?.id;
  const cJuan        = cls.find(c => c.name.startsWith('Juan Pérez'))?.id;
  const cRefac       = cls.find(c => c.name.startsWith('Refaccionaria'))?.id;
  const cMartinez    = cls.find(c => c.name.startsWith('Mecánico Martínez'))?.id;
  const cCarlos      = cls.find(c => c.name.startsWith('Carlos'))?.id;
  const cAna         = cls.find(c => c.name.startsWith('Ana'))?.id;
  const cBicho       = cls.find(c => c.name.startsWith('Taller El Bicho'))?.id;
  const cMario       = cls.find(c => c.name.startsWith('Mario Villarreal'))?.id;
  const cFletes      = cls.find(c => c.name.startsWith('Fletes Monterrey'))?.id;
  const cTorres      = cls.find(c => c.name.startsWith('Mecánico Torres'))?.id;
  const cRoberto     = cls.find(c => c.name.startsWith('Roberto'))?.id;
  const cGruero      = cls.find(c => c.name.startsWith('Gruero'))?.id;

  const orders = [
    { folio:'SCA-2026-001', cid:cTransportes, tid:tMarco, intake:'pieza_suelta', kind:'alternador', desc:'Alternador 180A Freightliner – no carga', status:'entregado',  total:'4800.00', daysAgo:30 },
    { folio:'SCA-2026-002', cid:cJuan,        tid:tHugo,  intake:'vehiculo',     kind:'marcha',     desc:'Marcha Nissan Frontier 2018 – no arranca', status:'listo',      total:'1850.00', daysAgo:14 },
    { folio:'SCA-2026-003', cid:cRefac,       tid:tMarco, intake:'pieza_suelta', kind:'alternador', desc:'Alternador 90A GM – piden diagnóstico',  status:'diagnostico', total:'0.00',    daysAgo:3  },
    { folio:'SCA-2026-004', cid:cMartinez,    tid:tEdu,   intake:'pieza_suelta', kind:'marcha',     desc:'3 marchas 12V Ford – reparación general', status:'reparacion',  total:'5250.00', daysAgo:7  },
    { folio:'SCA-2026-005', cid:cCarlos,      tid:tHugo,  intake:'vehiculo',     kind:'alternador', desc:'Alternador Ford F-150 2020 – luz batería', status:'entregado',  total:'2800.00', daysAgo:20 },
    { folio:'SCA-2026-006', cid:cAna,         tid:tMarco, intake:'vehiculo',     kind:'marcha',     desc:'Marcha Honda CRV 2017 – falla al arrancar', status:'listo',     total:'1650.00', daysAgo:10 },
    { folio:'SCA-2026-007', cid:cBicho,       tid:tEdu,   intake:'pieza_suelta', kind:'alternador', desc:'2 alternadores 120A Dodge – reconstrucción', status:'reparacion', total:'5400.00', daysAgo:5 },
    { folio:'SCA-2026-008', cid:cMario,       tid:tHugo,  intake:'vehiculo',     kind:'marcha',     desc:'Marcha Dodge Ram 1500 – falla arranque', status:'recibido',    total:'0.00',    daysAgo:1  },
    { folio:'SCA-2026-009', cid:cFletes,      tid:tMarco, intake:'pieza_suelta', kind:'marcha',     desc:'Marcha 24V International – urge', status:'diagnostico',        total:'0.00',    daysAgo:2  },
    { folio:'SCA-2026-010', cid:cTorres,      tid:tEdu,   intake:'pieza_suelta', kind:'alternador', desc:'Alternador 100A Toyota – no genera',  status:'reparacion',      total:'2350.00', daysAgo:8  },
    { folio:'SCA-2026-011', cid:cRoberto,     tid:tHugo,  intake:'vehiculo',     kind:'marcha',     desc:'Marcha 12V GM Silverado 2019',          status:'entregado',    total:'2100.00', daysAgo:25 },
    { folio:'SCA-2026-012', cid:cGruero,      tid:tMarco, intake:'pieza_suelta', kind:'otro',       desc:'Diagnóstico sistema eléctrico Kenworth', status:'cotizacion',  total:'800.00',  daysAgo:4  },
    { folio:'SCA-2026-013', cid:cTransportes, tid:tEdu,   intake:'pieza_suelta', kind:'alternador', desc:'Alternador 150A Kenworth – reconstrucción', status:'reparacion', total:'4500.00', daysAgo:6 },
    { folio:'SCA-2026-014', cid:cMartinez,    tid:tMarco, intake:'pieza_suelta', kind:'marcha',     desc:'Marcha 24V Freightliner – falla engrane', status:'listo',       total:'3800.00', daysAgo:12 },
    { folio:'SCA-2026-015', cid:cJuan,        tid:tHugo,  intake:'vehiculo',     kind:'marcha',     desc:'Marcha Toyota Hilux 2021',               status:'entregado',   total:'1750.00', daysAgo:18 },
    { folio:'SCA-2026-016', cid:cCarlos,      tid:tEdu,   intake:'vehiculo',     kind:'alternador', desc:'Alternador Nissan 90A – luces parpadeantes', status:'recibido', total:'0.00',    daysAgo:0  },
    { folio:'SCA-2026-017', cid:cBicho,       tid:tMarco, intake:'pieza_suelta', kind:'marcha',     desc:'4 marchas surtido – mecánico taller',   status:'diagnostico',  total:'0.00',    daysAgo:2  },
    { folio:'SCA-2026-018', cid:cFletes,      tid:tEdu,   intake:'pieza_suelta', kind:'alternador', desc:'Alternador 120A Ford pesado – no carga', status:'entregado',   total:'3200.00', daysAgo:22 },
    { folio:'SCA-2026-019', cid:cTorres,      tid:tHugo,  intake:'pieza_suelta', kind:'marcha',     desc:'2 marchas GM distintos coches',          status:'listo',        total:'4200.00', daysAgo:9  },
    { folio:'SCA-2026-020', cid:cRefac,       tid:tMarco, intake:'pieza_suelta', kind:'alternador', desc:'Kit alternadores reconstruidos para stock', status:'entregado', total:'9600.00', daysAgo:28 },
  ];

  for (const o of orders) {
    const history = buildHistory(o.status, o.daysAgo);
    const createdAt = new Date(Date.now() - o.daysAgo * 86400000).toISOString();
    const promised = new Date(Date.now() + 3 * 86400000).toISOString();
    await sql`
      INSERT INTO sca_orders (folio, client_id, technician_id, intake_type, part_kind, description, status, status_history, total, promised_at, created_at, updated_at)
      VALUES (${o.folio}, ${o.cid}, ${o.tid}, ${o.intake}, ${o.kind}, ${o.desc}, ${o.status}::sca_order_status,
              ${JSON.stringify(history)}::jsonb, ${o.total}, ${promised}::timestamptz,
              ${createdAt}::timestamptz, ${createdAt}::timestamptz)
      ON CONFLICT (folio) DO NOTHING
    `;
  }
  console.log("✓ Órdenes (20)");

  // Calificaciones
  await sql`
    INSERT INTO sca_ratings (order_id, client_name, stars, comment)
    SELECT o.id, c.name, 5, 'Excelente servicio, rápido y con garantía.'
    FROM sca_orders o JOIN sca_clients c ON c.id = o.client_id
    WHERE o.status IN ('entregado') AND NOT EXISTS (SELECT 1 FROM sca_ratings r WHERE r.order_id = o.id)
    LIMIT 5
  `;
  console.log("✓ Calificaciones");

  // Conteos finales
  const counts = await sql`
    SELECT
      (SELECT count(*) FROM sca_technicians) AS tecnicos,
      (SELECT count(*) FROM sca_clients)     AS clientes,
      (SELECT count(*) FROM sca_orders)      AS ordenes,
      (SELECT count(*) FROM sca_parts)       AS partes,
      (SELECT count(*) FROM sca_inventory)   AS inventario,
      (SELECT count(*) FROM sca_ratings)     AS calificaciones
  `;
  console.log("\n✅ SEED COMPLETADO:");
  console.log(counts[0]);
}

function buildHistory(finalStatus, daysAgo) {
  const flow = ['recibido','diagnostico','cotizacion','reparacion','listo','entregado'];
  const idx = flow.indexOf(finalStatus);
  const base = Date.now() - daysAgo * 86400000;
  return flow.slice(0, idx < 0 ? 1 : idx + 1).map((s, i) => ({
    status: s,
    at: new Date(base + i * 7200000).toISOString(),
  }));
}

run().catch(e => { console.error(e); process.exit(1); });
