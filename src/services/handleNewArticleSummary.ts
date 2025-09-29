import type { Summary } from "@/context/SummarizeContext";
import openAIFetch from "@/lib/openai";
import { randomUUID } from "crypto";

async function handleNewArticleSummary(url: string): Promise<Summary | null> {
  const userPrompt = `
  You are a professional summarizer. Given the full text of this online article, 
  write a concise summary that captures the key points, main argument, and relevant facts; 
  determine if there is a bias or not in the original article; 
  and create a title for the article: 
  ${url}`;

  const openAIResponse = await openAIFetch({
    endpoint: "https://api.openai.com/v1/responses",
    userPrompt,
  });
  if (openAIResponse.success) {
    const id = randomUUID();
    const now = Date.now();
    return {
      summary: openAIResponse.data.summary,
      bias: openAIResponse.data.bias,
      title: openAIResponse.data.title,
      id,
      url,
      createdAt: now,
    };
  } else {
    return null;
  }
}

export default handleNewArticleSummary;
