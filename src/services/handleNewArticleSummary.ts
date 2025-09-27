import type { Summary } from "@/context/SummarizeContext";
import { randomUUID } from "crypto";

async function handleNewArticleSummary(url: string): Promise<Summary | null> {
  // get html for url provided

  // extract all text to remove html

  // or, send html to open ai for summary generation (summary and bias)
  const openAIResponse = {
    success: true,
    data: {
      title: "Sample title",
      summary: "This is a sample summary.",
      bias: "this is a sample bias.",
    },
  };

  const id = randomUUID();
  const now = Date.now();

  return openAIResponse.success
    ? { ...openAIResponse.data, id, url, createdAt: now }
    : null;
}

export default handleNewArticleSummary;
