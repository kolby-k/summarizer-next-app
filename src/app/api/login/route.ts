import { createSession, getSession } from "../../../lib/session";
import { LoginSchema } from "../../../lib/validators";
import { authGate } from "../../../utils/authGate";
import { type NextRequest, NextResponse } from "next/server";

const FALLBACK_TTL_SECONDS = 600;
const SESSION_TTL_SECONDS = process.env.SESSION_TTL_SECONDS
  ? parseInt(process.env.SESSION_TTL_SECONDS)
  : FALLBACK_TTL_SECONDS;

export async function POST(req: NextRequest) {
  const json = await req.json();
  // validate input schema
  const parsed = LoginSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const message = `(${first.path.join(".").toUpperCase()}) ${first.message}`;
    return NextResponse.json({ success: false, message }, { status: 400 });
  }

  // verify credentials
  const isValidCredentials = authGate(parsed.data);
  if (!isValidCredentials) {
    return NextResponse.json(
      { success: false, message: "invalid credentials" },
      { status: 401 }
    );
  }

  // initalize a new session for cookie response
  const session = await createSession();

  // success
  const res = NextResponse.json({ success: true, session });
  res.cookies.set("sid", session.sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    domain: process.env.COOKIE_DOMAIN ?? undefined,
  });

  return res;
}
