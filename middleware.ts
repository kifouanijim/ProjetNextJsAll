"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkAuth } from "./utils/sessions";

export async function middleware(request: NextRequest) {
  const isAuthorized = await checkAuth();

  // Vérifier si l'utilisateur n'est pas autorisé et tente d'accéder à une route protégée
  if (
    (request.nextUrl.pathname.startsWith("/mon-compte") ||
      request.nextUrl.pathname.endsWith("/add")) &&
    isAuthorized.status >= 300
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continuer le traitement normal pour toutes les autres routes
  return NextResponse.next();
}
