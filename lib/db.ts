import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

const url = process.env.DATABASE_URL;

// Disponible solo si hay DATABASE_URL. Permite que el build/local pase sin DB,
// y que las API guarden con un 503 claro en vez de tronar.
export const dbAvailable = !!url;

export const sql: NeonQueryFunction<false, false> | null = url ? neon(url) : null;

export const db: NeonHttpDatabase<typeof schema> = url
  ? drizzle(sql!, { schema })
  : (new Proxy(
      {},
      {
        get() {
          throw new Error("DATABASE_URL no configurada — la base de datos no está disponible.");
        },
      }
    ) as NeonHttpDatabase<typeof schema>);

export { schema };
