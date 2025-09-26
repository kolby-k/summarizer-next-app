import { randomUUID, type UUID } from "crypto";
import { redis } from "@/lib/redis";

export type SessionData = {
  createdTime: number;
  lastSeenTime: number;
};

const FALLBACK_TTL_SECONDS = 600;
const SESSION_TTL_SECONDS = process.env.SESSION_TTL_SECONDS
  ? parseInt(process.env.SESSION_TTL_SECONDS)
  : FALLBACK_TTL_SECONDS;

// Create a session ID
// Insert session into redis
// Return the session id and created time
export async function createSession(): Promise<UUID> {
  const id: UUID = randomUUID();
  const key = `sess:${id}`;

  const data: SessionData = {
    createdTime: Math.floor(Date.now() / 1000),
    lastSeenTime: Math.floor(Date.now() / 1000),
  };

  await redis.set(key, JSON.stringify(data), {
    ex: SESSION_TTL_SECONDS,
  });

  return id;
}
