import { createSession } from "@/lib/session/createSession";
import { LoginSchema } from "@/lib/validators";
import type { UUID } from "crypto";

type LoginResult =
  | { ok: true; message: string; sessionId: UUID }
  | { ok: false; message: string };

export async function login(input: unknown): Promise<LoginResult> {
  const { username, password } = LoginSchema.parse(input);

  // only allow the username 'demo'
  if (username !== "demo")
    return {
      ok: false as const,
      message: "incorrect username",
    };

  // only allow the password 'test1234'
  if (password !== "test1234")
    return {
      ok: false as const,
      message: "incorrect password",
    };

  // create sessionId when login is successful
  const sessionId = await createSession();

  return {
    ok: true as const,
    sessionId,
    message: "Login credentials valid.",
  };
}
