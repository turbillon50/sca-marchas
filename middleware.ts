import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";
import { clerkEnabled } from "@/lib/clerk";

const isPublicRoute = createRouteMatcher([
  "/",
  "/seguimiento(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/seguimiento(.*)",
  "/api/health",
  "/api/setup",
]);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();
});

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
