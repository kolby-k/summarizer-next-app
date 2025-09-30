"use client";

import { useSession } from "../context/sessionContext";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const { setSession } = useSession();

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    setSession(null);

    router.replace("/");
  };

  return (
    <button onClick={handleLogout} className="logout-button mt-4">
      Logout
    </button>
  );
}

export default LogoutButton;
