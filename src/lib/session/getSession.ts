// lib/auth/getSession.ts (server-only)
import type { Session } from "@/context/sessionContext";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import type { SessionData } from "./createSession";

const FALLBACK_TTL_SECONDS = 600;
const SESSION_TTL_SECONDS = process.env.SESSION_TTL_SECONDS
  ? parseInt(process.env.SESSION_TTL_SECONDS)
  : FALLBACK_TTL_SECONDS;

export async function getSession(): Promise<Session> {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value;
  if (!sid) return null;
  const redisKey = `sess:${sid}`;

  // Lookup in your session store (Redis/DB)
  const session = await redis.get<SessionData>(redisKey);
  if (!session) return null;
  // Keep expiry rolling
  await redis.expire(redisKey, SESSION_TTL_SECONDS);

  const nowSeconds = Math.floor(Date.now() / 1000);
  const isSessionExpired =
    session.createdTime + SESSION_TTL_SECONDS <= nowSeconds;

  return isSessionExpired ? null : session;
}
