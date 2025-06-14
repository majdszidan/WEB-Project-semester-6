"use server";

import { Chat } from "@google/genai";
import { genai } from "./genai";

const modelConfig = {
  model: "models/gemini-2.0-flash",
  config: { temperature: 0.7 },
};

async function answerQuestion(
  language: string,
  topic: string,
  question: string,
  context?: string
): Promise<string> {
  const ai = genai.chats.create(modelConfig);

  const contextMessage = context
    ? `Here is some context related to the topic "${topic}" to help answer the question: ${context}`
    : "";

  const response = await ai.sendMessage({
    message: `
You are a smart and helpful course assistant. A student is asking a question about "${topic}". Your goal is to provide a clear and helpful explanation or answer.

**Language:** Your response MUST be in ${language}. Avoid using other languages.

${contextMessage}

**Question:**
${question}

**Instructions:**
- Give a direct and informative answer.
- Use simple and understandable language appropriate for high school students.
- If helpful, use examples or short analogies.
- Keep your tone supportive and encouraging.
- If you don't know the answer, say so politely and suggest where they might find more information.
- If the question is unclear, ask for clarification.
- If the question is about subjects outside of "${topic}", politely inform the student that you can only answer questions related to "${topic}".

Please respond ONLY with the answer in ${language}.
    `,
  });

  return response.text?.trim() ?? "מצטער, לא הצלחתי להבין את השאלה. נסה לנסח מחדש.";
}

async function generateFollowUpSuggestions(
  language: string,
  topic: string,
  previousQuestion: string
): Promise<string[]> {
  const ai = genai.chats.create(modelConfig);

  const response = await ai.sendMessage({
    message: `
Based on the previous student question about "${topic}":
"${previousQuestion}"

Suggest 3 helpful follow-up questions the student might ask next to deepen their understanding. Respond ONLY in ${language} as a list.
    `,
  });

  return response.text?.trim()?.split(/\n+/) ?? [];
}

export { answerQuestion, generateFollowUpSuggestions };
