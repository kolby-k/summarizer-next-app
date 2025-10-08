"use client";

import { useState } from "react";
import { useSession } from "../../../src/context/SessionContext";
import { useRouter } from "next/navigation";
import CustomButton from "../../../src/components/CustomButton";
import styles from "../summarize.module.css";

export default function SessionInfo() {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { session, setSession } = useSession();

  // createdTime -> Unix Epoch MS
  const display = session
    ? new Date(session.createdTime).toLocaleTimeString()
    : null;

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/logout", {
        method: "POST",
      });
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
      console.warn("Logout Error.");
    } finally {
      setLoading(false);
      setSession(null);
      router.replace("/");
    }
  };

  if (!session || !display) return null;
  return (
    <div className={styles.sessionInfoWrapper}>
      <CustomButton
        title="Logout"
        variant="warning"
        disabled={loading}
        disabledText="Loading"
        onClick={handleLogout}
        type="button"
      />
      <p className="mt-1 text-(--text-muted) font-light text-sm">
        Session started at:{" "}
        <time dateTime={display} suppressHydrationWarning>
          {display}
        </time>
      </p>
    </div>
  );
}
