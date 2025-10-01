// lib/session.ts (server-only)
import { cookies } from "next/headers";
import { redis } from "../lib/redis";
import { randomUUID, type UUID } from "crypto";

export type Session = {
  createdTime: number;
} | null;

const SESSION_TTL_SECONDS = Number(process.env.SESSION_TTL_SECONDS ?? 600);

// Create a session ID
// Insert session into redis
// Return the session id and created time
export async function createSession(): Promise<UUID> {
  const id: UUID = randomUUID();
  const key = `sess:${id}`;

  const data: Session = {
    createdTime: Math.floor(Date.now() / 1000),
  };

  await redis.set(key, JSON.stringify(data), {
    ex: SESSION_TTL_SECONDS,
  });

  return id;
}

// Get a session row from redis
export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value as UUID;
  if (!sid) return false;
  const redisKey = `sess:${sid}`;

  // Lookup in your session store (Redis/DB)
  const session = await redis.get<Session>(redisKey);
  if (!session) return false;
  // Keep expiry rolling
  await redis.expire(redisKey, SESSION_TTL_SECONDS);

  const nowSeconds = Math.floor(Date.now() / 1000);
  const isSessionExpired =
    session.createdTime + SESSION_TTL_SECONDS <= nowSeconds;

  return isSessionExpired ? false : true;
}

// Delete the session row from Redis
export async function removeSession(sid: string | undefined): Promise<boolean> {
  if (!sid) return false;
  const redisKey = `sess:${sid}`;
  await redis.del(redisKey);
  return true;
}
