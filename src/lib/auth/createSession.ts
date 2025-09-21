import { randomUUID } from "crypto";

type SessionData = {
  ip: string;
  createdAt: number;
};

export async function createSession(ip: string) {
  const id = randomUUID();
  const key = `sess:${id}`;

  const data: SessionData = {
    ip,
    createdAt: Date.now(),
  };

  // TODO: setup redis
  //await redis.set(key, JSON.stringify(data), { EX: SESSION_TTL_SECONDS });
  console.log("TODO: STORE SESSIN IN REDIS: ", key);
  console.log("REDIS VALUE: ", data);

  return id;
}
