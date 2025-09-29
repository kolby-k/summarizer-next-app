// lib/session.ts (server-only)
import type { Session } from "@/context/sessionContext";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { randomUUID, type UUID } from "crypto";

export type SessionData = {
  sessionId: UUID;
  createdTime: number;
};

export type RedisSession = {
  createdTime: number;
};

const SESSION_TTL_SECONDS = Number(process.env.SESSION_TTL_SECONDS ?? 600);

// Create a session ID
// Insert session into redis
// Return the session id and created time
export async function createSession(): Promise<SessionData> {
  const id: UUID = randomUUID();
  const key = `sess:${id}`;

  const data: RedisSession = {
    createdTime: Math.floor(Date.now() / 1000),
  };

  await redis.set(key, JSON.stringify(data), {
    ex: SESSION_TTL_SECONDS,
  });

  return { sessionId: id, createdTime: data.createdTime };
}

// Get a session row from redis
export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value as UUID;
  if (!sid) return null;
  const redisKey = `sess:${sid}`;

  // Lookup in your session store (Redis/DB)
  const session = await redis.get<RedisSession>(redisKey);
  if (!session) return null;
  // Keep expiry rolling
  await redis.expire(redisKey, SESSION_TTL_SECONDS);

  const nowSeconds = Math.floor(Date.now() / 1000);
  const isSessionExpired =
    session.createdTime + SESSION_TTL_SECONDS <= nowSeconds;
  console.log("expired?", isSessionExpired);
  return isSessionExpired
    ? null
    : { sessionId: sid, createdTime: session.createdTime };
}

// Delete the session row from Redis
export async function removeSession(sid: string | undefined) {
  if (!sid) return false;
  const redisKey = `sess:${sid}`;
  await redis.del(redisKey);
  return true;
}
