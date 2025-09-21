import { getClientIp } from "@/lib/getClientIp";
import { login } from "@/services/login";
import { env } from "../../../env";
import { ZodError } from "zod";
import { type NextRequest, NextResponse } from "next/server";

const SESSION_TTL_SECONDS = 60 * 60 * 1; // 1 hour
const COOKIE_NAME = "sid";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const ipAddress = getClientIp(req);
  let result;
  try {
    result = await login(body, ipAddress);
  } catch (e) {
    let message = "Validation error";

    if (e instanceof ZodError) {
      // Pick first error
      message = e.issues.map(
        (err) => `(${err.path.toString().toUpperCase()}) ${err.message} `
      )[0];
    } else if (e instanceof Error) {
      message = e.message;
    }
    // status 400: bad client request
    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 400,
      }
    );
  }

  // status 401: invalid information provided
  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        message: result.message,
      },
      {
        status: 401,
      }
    );
  }

  if (!result.sessionId)
    // status 500: server error generating session id
    return NextResponse.json(
      {
        success: false,
        message: result.message,
      },
      {
        status: 500,
      }
    );

  // success response
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE_NAME, result.sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
    domain: env.COOKIE_DOMAIN ?? undefined,
  });

  return res;
}
