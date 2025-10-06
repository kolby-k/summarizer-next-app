"use client";

import LoginForm from "./ui/LoginForm";
import TitleSection from "@/components/TitleSection";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import styles from "./login.module.css";
import CustomLink from "@/components/CustomLink";

export default function Login() {
  const router = useRouter();
  // auto-redirect if session is valid
  const { session } = useSession();

  useLayoutEffect(() => {
    if (session) {
      router.replace("/summarize");
    }
  }, [session, router]);

  if (session) return null;

  return (
    <div
      className={`${styles.page} ${styles.bgTexture} ${styles.bgTextureDim}`}
    >
      <div className={styles.header}>
        <span className={styles.backLink}>
          <CustomLink path="/" label="Back" type="link" />
        </span>
        <h3>Login</h3>
        <h4>Sign in to continue</h4>
      </div>
      <LoginForm />
    </div>
  );
}
