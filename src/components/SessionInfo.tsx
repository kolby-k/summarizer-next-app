"use client";

import LogoutButton from "./LogoutButton";
import { useSession } from "@/context/sessionContext";

export default function SessionInfo() {
  const { session } = useSession();
  if (!session) return null;
  // createdTime -> Unix Epoch MS
  const display = new Date(session.createdTime * 1000).toLocaleString();

  return (
    <div>
      Current Session Info:
      <p>
        Session Created:
        <time dateTime={display} suppressHydrationWarning>
          {display}
        </time>
      </p>
      <LogoutButton />
    </div>
  );
}
