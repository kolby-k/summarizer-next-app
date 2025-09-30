"use client";

import LogoutButton from "./LogoutButton";
import { useSession } from "../context/sessionContext";

export default function SessionInfo() {
  const { session } = useSession();
  if (!session) return null;
  // createdTime -> Unix Epoch MS
  const display = new Date(session.createdTime * 1000).toLocaleTimeString();

  return (
    <div className="mt-10">
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
