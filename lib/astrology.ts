import * as Astronomy from "astronomy-engine";
import { PLANETS } from "@/constants/planets";

const ASTRONOMY_BODIES: Record<string, Astronomy.Body> = {
  Sun: Astronomy.Body.Sun,
  Moon: Astronomy.Body.Moon,
  Mercury: Astronomy.Body.Mercury,
  Venus: Astronomy.Body.Venus,
  Mars: Astronomy.Body.Mars,
  Jupiter: Astronomy.Body.Jupiter,
  Saturn: Astronomy.Body.Saturn,
  Uranus: Astronomy.Body.Uranus,
  Neptune: Astronomy.Body.Neptune,
};

function getEclipticLongitude(body: Astronomy.Body, time: Astronomy.AstroTime): number {
  if (body === Astronomy.Body.Sun) {
    // SunPosition returns geocentric ecliptic coordinates
    return Astronomy.SunPosition(time).elon;
  }
  if (body === Astronomy.Body.Moon) {
    return Astronomy.EclipticGeoMoon(time).lon;
  }
  return Astronomy.EclipticLongitude(body, time);
}

// Retrograde is detected by negative apparent motion over a 1-day window
function isRetrograde(body: Astronomy.Body, date: Date): boolean {
  if (body === Astronomy.Body.Sun || body === Astronomy.Body.Moon) return false;

  const t1 = Astronomy.MakeTime(date);
  const t2 = Astronomy.MakeTime(new Date(date.getTime() + 86400000));

  const lon1 = Astronomy.EclipticLongitude(body, t1);
  const lon2 = Astronomy.EclipticLongitude(body, t2);

  let diff = lon2 - lon1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;

  return diff < 0;
}

function getZodiacSign(longitude: number): string {
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces",
  ];
  return signs[Math.floor(((longitude % 360) + 360) % 360 / 30)];
}

export function getPlanetaryContext(): string {
  const date = new Date();
  const time = Astronomy.MakeTime(date);

  const lines: string[] = [
    `Planetary positions as of ${date.toUTCString()}:`,
    "",
  ];

  for (const planet of PLANETS) {
    const body = ASTRONOMY_BODIES[planet.name];
    if (!body) continue;

    const longitude = getEclipticLongitude(body, time);
    const sign = getZodiacSign(longitude);
    const retrograde = isRetrograde(body, date);
    const retroLabel = retrograde ? " [RETROGRADE]" : "";

    lines.push(
      `${planet.emoji} ${planet.name}: ${longitude.toFixed(1)}° (${sign})${retroLabel}`
    );
  }

  lines.push("");
  lines.push(
    "Note: Retrograde planets indicate reversed or internalized energy in their domain."
  );

  return lines.join("\n");
}
