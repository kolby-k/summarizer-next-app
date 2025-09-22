// lib/auth/getSession.ts (server-only)
import type { Session } from "@/context/sessionContext";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import type { SessionData } from "./createSession";

export async function getSession(): Promise<Session> {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value;
  if (!sid) return null;
  const redisKey = `sess:${sid}`;

  // Lookup in your session store (Redis/DB)
  const session = await redis.get<SessionData>(redisKey);

  return session &&
    new Date(
      session.createdTime +
        parseInt(process.env?.SESSION_TTL_SECONDS ?? "600") * 1000
    ) > new Date()
    ? session
    : null;
}
