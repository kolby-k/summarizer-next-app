import { removeSession } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value;

  await removeSession(sid);

  const res = NextResponse.json({ success: true });
  // attach cookie clearing here
  res.cookies.set("sid", "", { path: "/", maxAge: 0 });

  return res;
}
