// lib/auth/getSession.ts (server-only)
import type { Session } from "@/context/sessionContext";
import { cookies } from "next/headers";
//import { db } from "@/lib/db";

export async function getSession(): Promise<Session> {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value;
  if (!sid) return null;

  // Lookup in your session store (Redis/DB)
  //const session = await db.session.findUnique({ where: { id: sid } });
  //return session && session.expiresAt > new Date() ? session : null;

  const session = { username: "demo", createdTime: new Date().toISOString() };
  return session;
}
