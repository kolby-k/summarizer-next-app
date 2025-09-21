// lib/getClientIp.ts
import type { NextRequest } from "next/server";

export function getClientIp(req: NextRequest): string {
  // On Vercel (and most proxies), the real client IP is in x-forwarded-for
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }

  // Local dev (Next standalone server)
  // Next’s Request doesn’t directly expose req.socket.remoteAddress,
  // but Vercel injects x-forwarded-for even in dev via its proxy.
  // As a fallback, you could look at Node’s underlying request (Edge Runtime won’t allow this).
  return "127.0.0.1"; // safe fallback
}
