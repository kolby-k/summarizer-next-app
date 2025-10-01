"use client";

import LogoutButton from "./LogoutButton";
import { useSession } from "../context/SessionContext";

export default function SessionInfo() {
  const { session } = useSession();
  if (!session) return null;
  // createdTime -> Unix Epoch MS
  const display = new Date(session.createdTime).toLocaleTimeString();

  return (
    <div className="absolute bottom-10 right-1/2 translate-x-1/2">
      <LogoutButton />
      <p className="mt-4 font-light text-sm">
        Session started at:{" "}
        <time dateTime={display} suppressHydrationWarning>
          {display}
        </time>
      </p>
    </div>
  );
}
