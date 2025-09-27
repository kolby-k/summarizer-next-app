import { redis } from "@/lib/redis";
import type { UUID } from "crypto";

const LIMIT = 3;
const WINDOW_SECONDS = 60;

export async function rateLimit(sessionId: UUID): Promise<boolean> {
  if (!sessionId || typeof sessionId !== "string") {
    throw new Error(
      "rateLimit missing paramater: Expecting a valid session id."
    );
  }

  const key = `rl:${sessionId}`;
  const count = await redis.incr(key);

  if (count === 1) {
    // first hit, set TTL
    await redis.expire(key, WINDOW_SECONDS);
  }

  return count <= LIMIT;
}
