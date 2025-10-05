import { useSession } from "@/context/SessionContext";
import loginAction, { type LoginResponse } from "../../app/login/actions";
import { useActionState, useEffect, useState } from "react";
import Loader from "./Loader";

export type LoginFormState = {
  username: string;
  password: string;
};

const initialState: LoginResponse = { ok: false, message: "" };

function LoginForm({}) {
  const { setSession } = useSession();

  const [state, formAction, isPending] = useActionState<
    LoginResponse,
    FormData
  >(loginAction, initialState);

  const [username, setUsername] = useState<null | string>(null);
  const [password, setPassword] = useState<null | string>(null);

  useEffect(() => {
    if (state && state.ok) {
      const sessionStart = Date.now();
      setSession({ createdTime: sessionStart });
    }
  }, [state, setSession]);

  return (
    <>
      <Loader isLoading={isPending} />

      <form action={formAction} className="form-container">
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
          placeholder="username"
          disabled={isPending}
        />
        <input
          id="password"
          name="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
          disabled={isPending}
        />
        <button className="submit-button" disabled={isPending}>
          {isPending ? "Loading..." : "Sign In"}
        </button>
      </form>
    </>
  );
}

export default LoginForm;
