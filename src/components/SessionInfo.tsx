"use client";
import { useSession } from "@/context/sessionContext";
import { useEffect, useState } from "react";

export default function SessionInfo() {
  const { session } = useSession();
  const iso = session?.createdTime ?? null;

  const [display, setDisplay] = useState("—");

  useEffect(() => {
    if (iso) {
      setDisplay(new Date(iso).toLocaleString());
    }
  }, [iso]);

  if (!session) return null;

  return (
    <div>
      Current Session Info:
      <p>Username: {session?.username ?? "—"}</p>
      <p>
        Session Created:{" "}
        <time dateTime={iso ?? undefined} suppressHydrationWarning>
          {display}
        </time>
      </p>
    </div>
  );
}
