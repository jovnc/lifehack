"use server";

import OpenAI from "openai";

const openai = new OpenAI();

export const sendNormalPrompt = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
  });
  return completion;
};
