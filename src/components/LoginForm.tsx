import loginAction, { LoginResponse } from "@/app/login/actions";
import { useSession } from "@/context/sessionContext";
import { useActionState, useEffect, useState } from "react";

export type LoginFormState = {
  username: string;
  password: string;
};

function LoginForm({}) {
  const { setSession } = useSession();

  const [state, formAction, isPending] = useActionState<
    LoginResponse,
    FormData
  >(loginAction, undefined);

  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  useEffect(() => {
    if (state && state.ok) {
      const sessionStart = Date.now();
      setSession({ createdTime: sessionStart });
    }
  }, [state, setSession]);

  return (
    <form action={formAction} className="form-container">
      {isPending && (
        <h1 className="text-green-200 text-lg font-semibold">Loading...</h1>
      )}
      {state && !state.ok && (
        <p className="text-(--toast-warning-border) text-lg font-semibold">
          {state.message}
        </p>
      )}
      <input
        id="username"
        name="username"
        value={username || ""}
        onChange={(e) => setUsername(e.target.value)}
        className="bg-slate-200 text-black pl-2"
        placeholder="username"
        disabled={isPending}
      />
      <input
        id="password"
        name="password"
        value={password || ""}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-slate-200 text-black pl-2"
        placeholder="password"
        type="password"
        disabled={isPending}
      />
      <button className="submit-button" disabled={isPending}>
        {isPending ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
