// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\server\services\openaiService.js

import "dotenv/config";
import OpenAI from "openai";
import { buildCallingPrompt } from "../prompts/callingPrompt.js";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "OPENAI_API_KEY was not found. Make sure server/.env exists and contains OPENAI_API_KEY=your_key_here"
  );
}

const openai = new OpenAI({
  apiKey
});

export const generateCallingReflection = async ({ language, name, answers }) => {
  const prompt = buildCallingPrompt({ language, name, answers });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a balanced Christian counselor who gives biblical, pastoral, practical, and humble guidance without claiming automatic prophecy."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.8
  });

  return completion.choices[0]?.message?.content || "";
};