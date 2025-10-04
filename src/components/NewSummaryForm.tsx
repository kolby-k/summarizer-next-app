// app/summarize/NewSummaryForm.tsx
"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  summarizeAction,
  type SummaryFormState,
} from "../../app/summarize/actions";
import { useFormStatus } from "react-dom";
import { useSummaries } from "../context/SummarizeContext";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="submit-button m-4" type="submit" disabled={pending}>
      {pending ? "Generating…" : "Generate Summary"}
    </button>
  );
}

const initialState: SummaryFormState = { ok: false, message: "" };

export default function NewSummaryForm() {
  const [state, formAction] = useActionState<SummaryFormState, FormData>(
    summarizeAction,
    initialState
  );

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
    <div className="flex flex-col">
      <form
        className="flex flex-col text-center justify-center items-center gap-1 p-2 w-[750px] mx-auto"
        ref={formRef}
        action={formAction}
      >
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
        <SubmitButton />
      </form>

      {/* Errors */}
      {!state.ok && state.message ? (
        <p role="alert" style={{ color: "crimson", marginTop: 8 }}>
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
