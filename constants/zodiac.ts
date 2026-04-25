export interface ZodiacSign {
  name: string;
  dateRange: string;
  trait: string;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  {
    name: "Aries",
    dateRange: "Mar 21 – Apr 19",
    trait: "Charges headfirst into bad decisions with impressive confidence.",
  },
  {
    name: "Taurus",
    dateRange: "Apr 20 – May 20",
    trait: "Has not moved from the couch in three days. Refuses to.",
  },
  {
    name: "Gemini",
    dateRange: "May 21 – Jun 20",
    trait: "Will tell you yes and no simultaneously and mean both.",
  },
  {
    name: "Cancer",
    dateRange: "Jun 21 – Jul 22",
    trait: "Crying about it either way. Has been since Tuesday.",
  },
  {
    name: "Leo",
    dateRange: "Jul 23 – Aug 22",
    trait: "Already told everyone they're doing it. There is no going back.",
  },
  {
    name: "Virgo",
    dateRange: "Aug 23 – Sep 22",
    trait: "Made a spreadsheet. The spreadsheet says no. They're doing it anyway.",
  },
  {
    name: "Libra",
    dateRange: "Sep 23 – Oct 22",
    trait: "Has been deciding since 2019. Update pending.",
  },
  {
    name: "Scorpio",
    dateRange: "Oct 23 – Nov 21",
    trait: "Already knows the answer. Is testing you.",
  },
  {
    name: "Sagittarius",
    dateRange: "Nov 22 – Dec 21",
    trait: "Booked the flight before finishing the question.",
  },
  {
    name: "Capricorn",
    dateRange: "Dec 22 – Jan 19",
    trait: "Consulted their 10-year plan. The cosmos were not in the forecast.",
  },
  {
    name: "Aquarius",
    dateRange: "Jan 20 – Feb 18",
    trait: "Disagrees with the ruling on principle but will comply ironically.",
  },
  {
    name: "Pisces",
    dateRange: "Feb 19 – Mar 20",
    trait: "Already emotionally lived through all possible outcomes. Exhausted.",
  },
];
