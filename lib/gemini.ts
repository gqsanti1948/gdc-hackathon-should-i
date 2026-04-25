import { GoogleGenAI } from "@google/genai";
import { buildPrompt } from "@/constants/prompts";

export interface CosmicRuling {
  verdict: "YES" | "NO" | "MAYBE";
  confidence: number;
  headline: string;
  reasoning: string;
  planet: string;
  emoji: string;
}

function parseRuling(raw: string): CosmicRuling {
  // Strip markdown code fences if the model wraps the JSON anyway
  const cleaned = raw.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/i, "").trim();
  const parsed = JSON.parse(cleaned);

  if (!["YES", "NO", "MAYBE"].includes(parsed.verdict)) {
    throw new Error(`Invalid verdict: ${parsed.verdict}`);
  }

  return {
    verdict: parsed.verdict,
    confidence: Number(parsed.confidence),
    headline: String(parsed.headline),
    reasoning: String(parsed.reasoning),
    planet: String(parsed.planet),
    emoji: String(parsed.emoji),
  };
}

export async function getCosmicRuling(
  question: string,
  planetaryContext: string
): Promise<CosmicRuling> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set. The cosmos are offline.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = buildPrompt(question, planetaryContext);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const raw = response.text ?? "";

  try {
    return parseRuling(raw);
  } catch {
    throw new Error(
      `The cosmos returned an unreadable ruling. Raw response: ${raw.slice(0, 300)}`
    );
  }
}
