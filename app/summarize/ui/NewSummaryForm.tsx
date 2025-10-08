// app/summarize/NewSummaryForm.tsx
"use client";

import { useActionState, useEffect, useRef } from "react";
import { summarizeAction, type SummaryFormState } from "../actions";
import { useSummaries } from "../../../src/context/SummarizeContext";
import Loader from "../../../src/components/Loader";
import CustomButton from "@/components/CustomButton";
import styles from "../summarize.module.css";

const initialState: SummaryFormState = { ok: false, message: "" };

export default function NewSummaryForm() {
  const [state, formAction, isPending] = useActionState<
    SummaryFormState,
    FormData
  >(summarizeAction, initialState);

  const { setCurrentSummary } = useSummaries();

  const formRef = useRef<HTMLFormElement>(null);

  // Optional: auto-reset the form on success
  useEffect(() => {
    if (state.ok) {
      setCurrentSummary(state.data);
      formRef.current?.reset();
    }
  }, [state, setCurrentSummary]);

  return (
    <>
      <Loader isLoading={isPending} />
      <form className={styles.summaryForm} ref={formRef} action={formAction}>
        <label className="text-lg font-semibold" htmlFor="url">
          Enter a Website URL
        </label>
        <input
          id="url"
          type="url"
          name="url"
          required
          placeholder="https://example.com/article"
        />
        <CustomButton
          title="Generate Summary"
          variant="primary"
          disabled={isPending}
          disabledText="Generating..."
          type="submit"
          styles="max-w-[300px]"
        />
      </form>
      {/* Errors */}
      {!state.ok && state.message ? (
        <p role="alert" style={{ color: "crimson", marginTop: 8 }}>
          {state.message}
        </p>
      ) : null}
    </>
  );
}
