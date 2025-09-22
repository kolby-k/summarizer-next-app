"use client";

import { useSession } from "@/context/sessionContext";
import { useState } from "react";
import type { ChangeEvent } from "react";

export default function SignIn() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  const { session, setSession } = useSession();

  async function handleSignIn() {
    if (!username) return setError("No username Provided...");
    if (!password) return setError("No password Provided...");

    const payload = { username, password };
    if (session) setError(null);
    setLoading(true);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log("login response", data);
    setLoading(false);
    if (!res.ok) {
      try {
        return setError(data.message);
      } catch (e) {
        return setError("Unknown Error...");
      }
    }

    setSession({ ...data });
    window.location.assign("/summarize");
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-red-500">Sign In</h1>
      {loading && (
        <h1 className="text-green-200 text-lg font-semibold">LOADING!!!</h1>
      )}
      {error && <h2 className="text-red-200 text-lg font-semibold">{error}</h2>}
      <input
        id="username"
        name="username"
        value={username || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setUsername(e.target.value);
        }}
        className="bg-slate-200 text-black pl-2"
        placeholder="username"
      />
      <input
        id="password"
        name="password"
        value={password || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        className="bg-slate-200 text-black pl-2"
        placeholder="password"
      />
      <button
        onClick={handleSignIn}
        className="cursor-pointer bg-blue-300 text-black px-4 py-2 rounded-lg"
      >
        Sign In
      </button>
    </div>
  );
}
