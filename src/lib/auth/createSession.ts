import { randomUUID } from "crypto";
import { redis } from "@/lib/redis";

export type SessionData = {
  ip: string;
  createdTime: number;
};

export async function createSession(ip: string) {
  const id = randomUUID();
  const key = `sess:${id}`;

  const data: SessionData = {
    ip,
    createdTime: Date.now(),
  };

  await redis.set(key, JSON.stringify(data), {
    ex: parseInt(process.env.SESSION_TTL_SECONDS ?? "600"),
  });

  return id;
}
