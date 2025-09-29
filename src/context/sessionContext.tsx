"use client";

import { SessionData } from "@/lib/session";
import { createContext, useContext, useMemo, useState } from "react";

export type Session = SessionData | null;

const SessionContext = createContext<{
  session: Session;
  setSession(s: Session): void;
}>({ session: null, setSession: () => {} });

export default function SessionProvider({
  initialSession,
  children,
}: {
  initialSession: Session;
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session>(initialSession);
  const value = useMemo(() => ({ session, setSession }), [session]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx)
    throw new Error("useSession must be used within <SessionProvider />");
  return ctx;
}
