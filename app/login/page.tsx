"use client";

import LoginForm from "@/components/LoginForm";
import TitleSection from "@/components/TitleSection";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

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
    <div className="page">
      <TitleSection
        title="Login"
        subTitle="Sign in to continue"
        actionButton={{ label: "Back", path: "/" }}
      />
      <LoginForm />
    </div>
  );
}
