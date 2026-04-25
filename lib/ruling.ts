import { getPlanetaryContext } from "@/lib/astrology";
import { getCosmicRuling, type CosmicRuling } from "@/lib/gemini";

export type { CosmicRuling };

export async function getRuling(question: string): Promise<CosmicRuling> {
  const planetaryContext = getPlanetaryContext();
  return getCosmicRuling(question, planetaryContext);
}
