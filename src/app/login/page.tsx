"use client";

import TitleSection from "../../components/TitleSection";
import { useSession } from "../../context/sessionContext";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  // auto-redirect if session is valid
  const { session, setSession } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  async function handleSignIn() {
    if (!username) return setError("No username Provided...");
    if (!password) return setError("No password Provided...");

    const payload = { username, password };
    setError(null);
    setLoading(true);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin",
        cache: "no-store",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    setLoading(false);
    if (!res.ok) {
      try {
        return setError(data.message);
      } catch (e) {
        return setError("Unknown Error...");
      }
    }

    console.log("DATA: ", data);
    setSession({ ...data.session });
    router.replace("/summarize");
  }

  useLayoutEffect(() => {
    if (session) {
      router.replace("/summarize");
    }
  }, [session]);

  if (session) return null;

  return (
    <div className="page">
      <TitleSection
        title="Login"
        subTitle="Sign in to continue"
        actionButton={{ label: "Back", path: "/" }}
      />
      <div className="form-container">
        {loading && (
          <h1 className="text-green-200 text-lg font-semibold">Loading...</h1>
        )}
        {error && (
          <h2 className="text-red-200 text-lg font-semibold">{error}</h2>
        )}
        <input
          id="username"
          name="username"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-slate-200 text-black pl-2"
          placeholder="username"
          disabled={loading}
        />
        <input
          id="password"
          name="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-200 text-black pl-2"
          placeholder="password"
          type="password"
          disabled={loading}
        />
        <button onClick={handleSignIn} className="submit-button">
          Sign In
        </button>
      </div>
    </div>
  );
}
