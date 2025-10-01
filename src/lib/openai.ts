export interface openAIFetchParameters {
  userPrompt: string;
  endpoint?: string;
}

export interface openAIAPIResponse {
  success: boolean;
  message?: string;
  data: {
    summary: string;
    bias: string;
    title: string;
  };
}

async function openAIFetch({
  userPrompt,
  endpoint = "https://api.openai.com/v1/responses",
}: openAIFetchParameters): Promise<openAIAPIResponse> {
  if (!endpoint.startsWith("https://api.openai.com/v1"))
    throw new Error(
      "Invalid Endpoint Parameter: expected the domain 'https://api.openai.com/v1'..."
    );

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  };

  const requestBody = {
    model: "gpt-4o-mini",
    tools: [{ type: "web_search" }],
    input: userPrompt,
    text: {
      format: {
        type: "json_schema",
        name: "summary_bias_title",
        schema: {
          type: "object",
          properties: {
            summary: {
              type: "string",
              description:
                "A clear, concise summary of the article in one or two short paragraphs.",
            },
            bias: {
              type: "string",
              description:
                "In under 100 words, identify whether the article shows bias. If so, explain the nature of the bias.",
            },
            title: {
              type: "string",
              description:
                "A brief, original, and relevant title that captures the essence of the article.",
            },
          },
          required: ["summary", "bias", "title"],
          additionalProperties: false,
        },
        strict: true,
      },
    },
  };

  let data;
  try {
    const resp = await fetch(endpoint, {
      headers,
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (!resp.ok) {
      return {
        success: false,
        message: "API Error.",
        data: {
          summary: "",
          bias: "",
          title: "",
        },
      };
    }

    data = await resp.json();
  } catch (error) {
    throw new Error("Error: Something went wrong...");
  }

  const messages = [...data.output];
  const modelRespObj = messages.find((d) => d?.type === "message");
  const modelResponse = JSON.parse(modelRespObj.content[0].text);
  const response = {
    success: true,
    data: {
      summary: modelResponse.summary,
      bias: modelResponse.bias,
      title: modelResponse.title,
    },
  };
  return response;
}

export default openAIFetch;
