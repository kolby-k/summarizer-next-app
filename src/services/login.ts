import { createSession } from "@/lib/auth/createSession";
import { LoginSchema } from "@/lib/validators";
import type { UUID } from "crypto";

export async function login(
  input: unknown,
  ipAddress: string
): Promise<{ ok: boolean; message: string; sessionId: UUID | null }> {
  const { username, password } = LoginSchema.parse(input);

  // only allow the username 'demo'
  if (username !== "demo")
    return {
      ok: false as const,
      message: "incorrect username",
      sessionId: null,
    };

  // only allow the password 'test1234'
  if (password !== "test1234")
    return {
      ok: false as const,
      message: "incorrect password",
      sessionId: null,
    };

  // create sessionId when login is successful
  const sessionId = await createSession(ipAddress);

  return {
    ok: true as const,
    sessionId,
    message: "Login credentials valid.",
  };
}
