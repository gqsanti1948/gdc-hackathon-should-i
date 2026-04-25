export interface Planet {
  name: string;
  emoji: string;
  meaning: string;
}

export const PLANETS: Planet[] = [
  {
    name: "Sun",
    emoji: "☀️",
    meaning: "Your ego, identity, and general sense of self-importance.",
  },
  {
    name: "Moon",
    emoji: "🌙",
    meaning: "Your emotions, instincts, and irrational 2am decisions.",
  },
  {
    name: "Mercury",
    emoji: "☿️",
    meaning: "Communication, logic, and why your texts get misread.",
  },
  {
    name: "Venus",
    emoji: "♀️",
    meaning: "Love, beauty, and all the things you want but probably shouldn't have.",
  },
  {
    name: "Mars",
    emoji: "♂️",
    meaning: "Action, aggression, and the part of you that sends emails at 11pm.",
  },
  {
    name: "Jupiter",
    emoji: "♃",
    meaning: "Expansion, luck, and overconfidence dressed up as optimism.",
  },
  {
    name: "Saturn",
    emoji: "♄",
    meaning: "Discipline, karma, and the cosmic HR department.",
  },
  {
    name: "Uranus",
    emoji: "♅",
    meaning: "Revolution, disruption, and chaos disguised as innovation.",
  },
  {
    name: "Neptune",
    emoji: "♆",
    meaning: "Dreams, illusions, and why nothing is ever quite what it seems.",
  },
];
