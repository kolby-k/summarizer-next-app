import { useActionState, useEffect, useState } from "react";
import { useSession } from "@/context/SessionContext";
import Loader from "@/components/Loader";
import loginAction, { type LoginResponse } from "../../../app/login/actions";
import CustomButton from "@/components/CustomButton";
import styles from "../login.module.css";

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
      <div className={styles.formContainer}>
        <form action={formAction} className={styles.loginForm}>
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
          <CustomButton
            title="Login"
            variant="primary"
            disabled={isPending}
            disabledText="Loading.."
            type="submit"
          />
        </form>
      </div>
    </>
  );
}

export default LoginForm;
