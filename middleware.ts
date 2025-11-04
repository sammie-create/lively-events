// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  // Back Office domain
  if (host?.startsWith("admin.")) {
    return NextResponse.rewrite(
      new URL(`/back-office${request.nextUrl.pathname}`, request.url)
    );
  }

  // Front Office domain
  if (host?.startsWith("events.")) {
    return NextResponse.rewrite(
      new URL(`/front-office${request.nextUrl.pathname}`, request.url)
    );
  }

  // Default fallback (maybe your main marketing site)
  return NextResponse.rewrite(
    new URL(`/front-office${request.nextUrl.pathname}`, request.url)
  );
}
