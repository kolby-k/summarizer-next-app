import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export const SummarizeSchema = z.object({
  url: z.url({ message: "Must be a valid URL" }),
});
