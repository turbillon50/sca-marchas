import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";
import { clerkEnabled } from "@/lib/clerk";

// Todas las rutas son públicas — el login es OPCIONAL.
// Clerk solo inyecta el contexto de sesión; no protege nada.
const clerkHandler = clerkMiddleware();

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Sin keys de Clerk (local/CI), todo pasa: las rutas públicas rinden y no truena.
  if (!clerkEnabled) return NextResponse.next();
  return clerkHandler(req, ev);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
