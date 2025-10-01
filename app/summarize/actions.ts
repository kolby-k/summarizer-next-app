"use server";

import { SummarizeSchema } from "@/lib/validators";
import handleNewArticleSummary from "@/services/handleNewArticleSummary";
import { rateLimit } from "@/lib/rateLimit";
import isUUID from "@/utils/isUUID";
import { cookies } from "next/headers";
import type { Summary } from "@/context/SummarizeContext";

export type SummaryFormState =
  | { ok: false; message: string }
  | {
      ok: true;
      data: Summary;
    };

export async function summarizeAction(
  _prevState: SummaryFormState | undefined,
  formData: FormData
): Promise<SummaryFormState> {
  // --- Session & rate limit up front ---
  const sid = (await cookies()).get("sid")?.value ?? null;
  if (!sid || !isUUID(sid)) {
    return { ok: false, message: "Please sign in to continue." };
  }
  const allowed = await rateLimit(sid);
  if (!allowed) {
    return {
      ok: false,
      message: "Too many requests: please wait 1 minute and try again.",
    };
  }

  // Ratelimit ok: proceed with request
  const url = String(formData.get("url") ?? "");

  const parsed = SummarizeSchema.safeParse({ url });
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const message = `(${first.path.join(".").toUpperCase()}) ${first.message}`;
    return { ok: false, message };
  }

  const summaryData = await handleNewArticleSummary(parsed.data.url);

  if (!summaryData) {
    return {
      ok: false,
      message: "Server Error: Could not generate a summary.",
    };
  }

  return { ok: true, data: { ...summaryData } };
}
