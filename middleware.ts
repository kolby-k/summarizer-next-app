import { NextResponse, type NextRequest } from "next/server";
import { redis } from "@/lib/redis";
import isUUID from "@/utils/isUUID";

const SESSION_TTL_SECONDS = Number(process.env.SESSION_TTL_SECONDS ?? 600);

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const isApi = pathname.startsWith("/api/");
  const sid = req.cookies.get("sid")?.value ?? null;

  // Allow root, login, and auth endpoints
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  // --- API branch: you're not guarding APIs here ---
  if (isApi) return NextResponse.next();

  // --- Page branch (non-API) ---
  if (!sid || !isUUID(sid)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  // 1) Auth by Redis existence (+ rolling TTL)
  const key = `sess:${sid}`;
  const p = redis.pipeline();
  p.exists(key);
  p.expire(key, SESSION_TTL_SECONDS); // optional rolling TTL
  const [exists] = await p.exec<number[]>();

  if (!exists) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname + search);
    const res = NextResponse.redirect(url);
    res.cookies.set("sid", "", { path: "/", maxAge: 0, httpOnly: true });
    return res;
  }

  return NextResponse.next();
}

// Run on everything except login and Next internals
export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};
