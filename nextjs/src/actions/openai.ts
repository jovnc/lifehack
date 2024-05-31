"use server";

import OpenAI from "openai";

export const sendNormalPrompt = async (
  prompt: string,
  key: string,
  data: string
) => {
  const openai = new OpenAI({
    apiKey: key,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant with the role of generating business insights based on store transaction data. You will only respond with business insights. This is the JSON file of the transaction data: ${data}`,
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    return { response: completion };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
