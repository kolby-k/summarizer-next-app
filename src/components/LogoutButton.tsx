"use client";

import { useSession } from "@/context/sessionContext";
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
    <button
      onClick={handleLogout}
      className="cursor-pointer bg-blue-300 text-black px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
