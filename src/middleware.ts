// middleware.ts (root or src/)
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  console.log("Middlware", pathname + " > " + search);
  // allow the sign-in page and auth endpoints
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // (Optional) let all API routes through; handle API auth inside the handler
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const isAuth = req.cookies.get("sid")?.value;
  if (!isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("next", pathname); // e.g. /dashboard?tab=a
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Exclude Next.js internals & static files by default
export const config = {
  matcher: ["/summarize/:path*", "/bookmarks/:path*"],
};
