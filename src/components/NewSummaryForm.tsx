// app/summarize/NewSummaryForm.tsx
"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  summarizeAction,
  type SummaryFormState,
} from "@/app/summarize/actions";
import { useFormStatus } from "react-dom";
import { useSummaries } from "@/context/SummarizeContext";
import SummaryCard from "./SummaryCard";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="px-4 py-2 font-semibold bg-green-500 rounded-md m-2 mx-auto"
      type="submit"
      disabled={pending}
    >
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

  const { setCurrentSummary, currentSummary } = useSummaries();

  const formRef = useRef<HTMLFormElement>(null);

  // Optional: auto-reset the form on success
  useEffect(() => {
    if (state.ok) {
      setCurrentSummary(state.data);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <>
      <form
        className="flex flex-col text-center justify-center items-center gap-1"
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
          className="text-left text-white pl-1 bg-neutral-600 min-w-[300px]"
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

      {currentSummary && (
        <div className="h-100 bg-green-500 relative">
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <SummaryCard data={currentSummary} />
          </div>
        </div>
      )}
    </>
  );
}
