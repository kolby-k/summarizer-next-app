"use server";

import { cookies } from "next/headers";
import { LoginSchema } from "@/lib/validators";
import { createSession } from "@/lib/session";
import { authGate } from "@/utils/authGate";
import type { LoginFormState } from "@/components/LoginForm";

const FALLBACK_TTL_SECONDS = 600;
const SESSION_TTL_SECONDS = process.env.SESSION_TTL_SECONDS
  ? parseInt(process.env.SESSION_TTL_SECONDS)
  : FALLBACK_TTL_SECONDS;

export type LoginResponse =
  | {
      ok: false;
      message: string;
    }
  | { ok: true; data: LoginFormState };

async function loginAction(
  _prevState: LoginResponse,
  formData: FormData | null
): Promise<LoginResponse> {
  // initial state is null
  if (!formData) return { ok: false, message: "Missing Information..." };

  // user input from form
  const usernameInput = formData.get("username");
  const passwordInput = formData.get("password");

  if (usernameInput !== null && usernameInput.toString().length < 3)
    return { ok: false, message: "Username must be 3 or more characters." };
  if (passwordInput !== null && passwordInput.toString().length < 8)
    return { ok: false, message: "Password must be 8 or more characters." };

  // validate input with zod
  const parsed = LoginSchema.safeParse({
    username: usernameInput,
    password: passwordInput,
  });
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const message = `(${first.path.join(".").toUpperCase()}) ${first.message}`;
    return { ok: false, message };
  }

  // safe credentials
  const { username, password } = parsed.data;

  // verify credentials
  const isValidCredentials = authGate(parsed.data);
  if (!isValidCredentials) {
    return { ok: false, message: "invalid credentials" };
  }

  // initalize a new session for cookie response
  const sessionId = await createSession();

  const cookie = await cookies();

  cookie.set("sid", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  // success
  return { ok: true, data: { password, username } };
}

export default loginAction;
