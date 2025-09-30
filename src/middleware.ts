import { NextResponse, type NextRequest } from "next/server";
import { redis } from "./lib/redis";
import isUUID from "./utils/isUUID";

const SESSION_TTL_SECONDS = Number(process.env.SESSION_TTL_SECONDS ?? 600);

const PUBLIC_PATHS = [
  "/", // landing
  "/login", // auth page(s)
  "/api/auth", // auth callbacks/endpoints
];

function isPublic(pathname: string) {
  return (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/assets/")
  );
}

export async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;

  // // Allow public & internal assets through
  // if (isPublic(pathname)) return NextResponse.next();
  // // Gate everything else by the presence + shape of the session cookie
  // const sid = req.cookies.get("sid")?.value ?? null;
  // if (!sid || !isUUID(sid)) {
  //   return redirectToLogin(req);
  // }

  // // --- Edge-safe Redis check (single RTT): EXISTS + EXPIRE ---
  // const key = `sess:${sid}`;
  // try {
  //   const pipe = redis.pipeline();
  //   pipe.exists(key);
  //   pipe.expire(key, SESSION_TTL_SECONDS);
  //   const [exists /*: number*/ /*expireOk: number*/] = await pipe.exec<
  //     number[]
  //   >();

  //   if (!exists) {
  //     const res = redirectToLogin(req);
  //     // clear the stale cookie
  //     res.cookies.set("sid", "", {
  //       path: "/",
  //       maxAge: 0,
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: "lax",
  //     });
  //     return res;
  //   }
  // } catch {
  //   // On Redis/network error, be conservative and require re-auth
  //   return redirectToLogin(req);
  // }

  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set(
    "next",
    req.nextUrl.pathname + (req.nextUrl.search ?? "")
  );
  return NextResponse.redirect(url);
}

// Run on everything except login and Next internals
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
