import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { logoutSession } from "@/lib/session/logout";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value;

  await logoutSession(sid);

  const res = NextResponse.json({ success: true });
  // attach cookie clearing here
  res.cookies.set("sid", "", { path: "/", maxAge: 0 });

  return res;
}
