# Should I? 🪐

**Live app:** [gdc-hackathon-should-i.vercel.app](https://gdc-hackathon-should-i.vercel.app)

A Google homepage parody that consults real planetary positions and Gemini AI to deliver cosmic rulings on your life decisions.

Ask a yes/no question like _"Should I quit my job and become a lighthouse keeper?"_ and the Cosmic HR Department will review your file, check the stars, and issue an official ruling — deadpan corporate astrology style.

---

## What it does

- Takes any yes/no life question
- Calculates real-time positions of 9 planets (Sun through Neptune) using actual astronomical data
- Detects which planets are currently in retrograde
- Sends the planetary context to Gemini AI, which issues a structured ruling: **YES** or **NO** — the cosmos do not deal in maybes
- Returns a verdict with a confidence score, headline, planet-grounded reasoning, and the responsible planet
- Features a dark cosmic UI with an animated starfield and moon

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Google Gemini 2.5 Flash (`@google/genai`) |
| Astronomy | `astronomy-engine` |
| Deployment | Vercel |

---

## Project structure

```
├── app/
│   ├── api/ask/route.ts     # POST endpoint — receives question, returns ruling
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main page — idle / loading / result / error states
│   └── globals.css          # Tailwind base styles + starfield + moon animations
│
├── components/
│   ├── SearchBox.tsx        # Google-style search input with "Ask the Cosmos" and "I'm Feeling Cosmic" buttons
│   ├── CosmicRuling.tsx     # Displays verdict, headline, reasoning, confidence bar, ruling planet
│   └── LoadingCosmos.tsx    # Animated orbiting rings with cycling planet messages
│
├── constants/
│   ├── planets.ts           # 9 planets with names, emojis, and astrological meanings
│   ├── zodiac.ts            # 12 zodiac signs with date ranges and traits
│   └── prompts.ts           # Gemini prompt builder — instructs the Cosmic HR Department tone
│
├── lib/
│   ├── astrology.ts         # Real-time planetary positions + retrograde detection
│   ├── gemini.ts            # Gemini API call + JSON response parser + type definitions
│   └── ruling.ts            # Orchestrates astrology + Gemini into a single getRuling() call
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

> Make sure to get your key from **Google AI Studio**, not Google Cloud Console. Cloud Console keys may have a free tier quota of 0.

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

If neither works, create the file manually in VS Code: right-click the project folder → **New File** → name it `.env.local`, then paste:

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
The `SearchBox` component sends the question to `POST /api/ask`. The **"I'm Feeling Cosmic"** button picks a random question and submits it automatically.

### 2. Planetary positions are calculated
`lib/astrology.ts` uses `astronomy-engine` to compute the real geocentric ecliptic longitude of all 9 planets at the current moment. Retrograde motion is detected by comparing each planet's longitude 24 hours apart — if it decreases, the planet is moving backward.

### 3. Gemini receives the context
`lib/gemini.ts` builds a prompt via `constants/prompts.ts` that includes the question and the full planetary briefing. Gemini is instructed to act as the **Cosmic HR Department**, reference the actual planetary positions in its reasoning, explain what they mean in plain terms, and return a strict JSON object.

### 4. The ruling is returned
Gemini's response is parsed and validated. The front end displays the verdict (YES or NO), confidence percentage, a punchy headline, planet-grounded reasoning, and the planet most responsible for the ruling.

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
  "verdict": "YES",
  "confidence": 78,
  "headline": "Jupiter has reviewed your file and approves wholeheartedly",
  "reasoning": "Jupiter is currently in Cancer at 118°, a sign associated with home, comfort, and emotional abundance — the planet of expansion in a nurturing sign is practically a cosmic endorsement of adding more love to your household. Venus in Cancer further reinforces this, indicating your capacity for affection is at a seasonal high. The cosmos have reviewed your living situation and see no structural objections to another cat.",
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

**Validation rules:**
- Question must be a non-empty string
- Maximum 500 characters

---

## Environment variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Gemini API key from Google AI Studio | Yes |

---

## Deployment

The app is deployed on Vercel at [gdc-hackathon-should-i.vercel.app](https://gdc-hackathon-should-i.vercel.app).

Every push to `main` triggers an automatic redeployment. The `GEMINI_API_KEY` is stored as an environment variable in Vercel — it is never exposed in the repository.

To deploy your own instance:
1. Import the repo on [vercel.com](https://vercel.com)
2. Add `GEMINI_API_KEY` under **Environment Variables** during setup
3. Deploy — Vercel handles the rest

---

## Troubleshooting

**`npm` is not recognized (Windows)**
Close your terminal, reopen it, and try again. The PATH is updated after Node installs but requires a terminal restart.

**`GEMINI_API_KEY` quota errors (`limit: 0`)**
Your key is from Google Cloud Console, not AI Studio. Get a new one at [aistudio.google.com](https://aistudio.google.com) — AI Studio keys include 1,500 free requests/day on Gemini 2.0 Flash.

**Port already in use**
Another process is using port 3000. Run on a different port:
```bash
npm run dev -- -p 3001
```

**Gemini returns unreadable response**
The model occasionally wraps JSON in markdown fences. The parser in `lib/gemini.ts` strips these automatically, but if you see a raw response error, check that your API key has quota remaining.
