# Should I? 🪐

A Google homepage parody that consults real planetary positions and Gemini AI to deliver cosmic rulings on your life decisions.

Ask a yes/no question like _"Should I quit my job and become a lighthouse keeper?"_ and the Cosmic HR Department will review your file, check the stars, and issue an official ruling — deadpan corporate astrology style.

---

## What it does

- Takes any yes/no life question
- Calculates real-time positions of 9 planets (Sun through Neptune) using actual astronomical data
- Detects which planets are currently in retrograde
- Sends the planetary context to Gemini AI, which issues a structured ruling: **YES** or **NO** — the cosmos do not deal in maybes
- Returns a verdict with a confidence score, headline, reasoning, and the responsible planet

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Google Gemini 2.5 Flash (`@google/genai`) |
| Astronomy | `astronomy-engine` |

---

## Project structure

```
├── app/
│   ├── api/ask/route.ts     # POST endpoint — receives question, returns ruling
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page with all UI states
│   └── globals.css          # Tailwind base styles
│
├── components/
│   ├── SearchBox.tsx        # Google-style search input + buttons
│   ├── CosmicRuling.tsx     # Displays the verdict, headline, reasoning, planet
│   └── LoadingCosmos.tsx    # Animated loading state cycling through planets
│
├── constants/
│   ├── planets.ts           # Planet names, emojis, and astrological meanings
│   ├── zodiac.ts            # 12 zodiac signs with date ranges and traits
│   └── prompts.ts           # Gemini prompt builder (buildPrompt function)
│
├── lib/
│   ├── astrology.ts         # Real planetary positions via astronomy-engine
│   ├── gemini.ts            # Gemini API call + JSON response parser
│   └── ruling.ts            # Orchestrates astrology + Gemini into getRuling()
│
├── .env.example             # Template for required environment variables
└── .env.local               # Your actual API key (never committed)
```

---

## Prerequisites

- **Node.js 18 or higher** — download from [nodejs.org](https://nodejs.org) or install via:
  - macOS/Linux: `nvm install --lts`
  - Windows: `winget install OpenJS.NodeJS.LTS`
- **A Gemini API key** — get one free at [aistudio.google.com](https://aistudio.google.com) → Get API key

---

## Getting started

### 1. Clone the repository

```bash
git clone <repo-url>
cd gdc-hackathon-should-i
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

Create a `.env.local` file in the root of the project:

```bash
# macOS/Linux
cp .env.example .env.local

# Windows (PowerShell)
copy .env.example .env.local
```

Then open `.env.local` and replace the placeholder with your real key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Important:** Never commit `.env.local` — it is already in `.gitignore`.

### 4. Run the development server

```bash
# macOS/Linux
npm run dev

# Windows (if npm is not found, close and reopen your terminal after installing Node)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How it works

### 1. User submits a question
The `SearchBox` component sends the question to `POST /api/ask`.

### 2. Planetary positions are calculated
`lib/astrology.ts` uses `astronomy-engine` to compute the real geocentric ecliptic longitude of all 9 planets at the current moment. It also detects retrograde motion by comparing each planet's position 24 hours apart — if the longitude decreases, the planet is moving backward.

### 3. Gemini receives the context
`lib/gemini.ts` builds a prompt via `constants/prompts.ts` that includes the question and a formatted planetary briefing. Gemini is instructed to respond as the "Cosmic HR Department" and return a strict JSON object.

### 4. The ruling is returned
Gemini's response is parsed and validated. The front end displays the verdict, confidence bar, headline, reasoning, and the planet responsible for the ruling.

---

## API

### `POST /api/ask`

**Request body:**
```json
{
  "question": "Should I adopt another cat?"
}
```

**Response:**
```json
{
  "verdict": "YES", // or "NO"
  "confidence": 78,
  "headline": "Jupiter has reviewed your file and approves wholeheartedly",
  "reasoning": "Jupiter is currently in Cancer, a sign known for its fondness for home and comfort. The moon confirms that your emotional bandwidth is at capacity in the best possible way. The cosmos see no reason to stop at one cat.",
  "planet": "Jupiter",
  "emoji": "♃"
}
```

**Error response:**
```json
{
  "error": "A question is required. The cosmos cannot rule on nothing."
}
```

---

## Environment variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Gemini API key from Google AI Studio | Yes |

---

## Troubleshooting

**`npm` is not recognized (Windows)**
Close your terminal, reopen it, and try again. The PATH is updated after Node installs but requires a terminal restart.

**`GEMINI_API_KEY` quota errors**
Make sure your key was created at [aistudio.google.com](https://aistudio.google.com) — keys from Google Cloud Console may have a free tier quota of 0. AI Studio keys include 1,500 free requests/day on Gemini 2.0 Flash.

**Port already in use**
Another process is using port 3000. Either stop that process or run on a different port:
```bash
npm run dev -- -p 3001
```
