import { LoginSchema } from "@/lib/validators";
import { login } from "@/services/login";
import { type NextRequest, NextResponse } from "next/server";

const FALLBACK_TTL_SECONDS = 600;
const SESSION_TTL_SECONDS = process.env.SESSION_TTL_SECONDS
  ? parseInt(process.env.SESSION_TTL_SECONDS)
  : FALLBACK_TTL_SECONDS;

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = LoginSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const message = `(${first.path.join(".").toUpperCase()}) ${first.message}`;
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
  const result = await login(parsed.data);

  if (!result.ok) {
    // Tip: use a generic message to avoid username enumeration
    return NextResponse.json(
      { success: false, message: "invalid credentials" },
      { status: 401 }
    );
  }

  // success response
  const res = NextResponse.json({ success: true });
  res.cookies.set("sid", result.sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    domain: process.env.COOKIE_DOMAIN ?? undefined,
  });

  return res;
}
