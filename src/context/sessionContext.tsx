"use client";

import { SessionData } from "@/lib/auth/createSession";
import { createContext, useContext, useState } from "react";

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

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
