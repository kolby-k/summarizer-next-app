import { redis } from "../redis";

export async function logoutSession(sid: string | undefined) {
  if (!sid) return false;
  const redisKey = `sess:${sid}`;
  await redis.del(redisKey);
  return true;
}
