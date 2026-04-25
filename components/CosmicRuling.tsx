"use client";

import type { CosmicRuling } from "@/lib/ruling";

interface CosmicRulingProps {
  ruling: CosmicRuling;
  question: string;
}

const VERDICT_STYLES = {
  YES: {
    text: "text-green-400",
    bg: "bg-green-900/30",
    border: "border-green-500/40",
    bar: "bg-green-400",
    glow: "shadow-green-500/20",
  },
  NO: {
    text: "text-red-400",
    bg: "bg-red-900/30",
    border: "border-red-500/40",
    bar: "bg-red-400",
    glow: "shadow-red-500/20",
  },
};

export default function CosmicRulingDisplay({ ruling, question }: CosmicRulingProps) {
  const styles = VERDICT_STYLES[ruling.verdict];

  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      {/* Question recap */}
      <p className="text-indigo-300/70 text-sm text-center truncate">
        &ldquo;{question}&rdquo;
      </p>

      {/* Verdict card */}
      <div className={`rounded-2xl border ${styles.border} ${styles.bg} backdrop-blur-sm p-6 flex flex-col items-center gap-3 shadow-xl ${styles.glow}`}>
        <div className={`text-7xl font-bold tracking-tight ${styles.text} drop-shadow-lg`}>
          {ruling.verdict}
        </div>
        <div className="text-white/90 text-lg font-medium text-center">
          {ruling.headline}
        </div>
      </div>

      {/* Reasoning */}
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 text-indigo-100/80 text-sm leading-relaxed">
        {ruling.reasoning}
      </div>

      {/* Planet + confidence row */}
      <div className="flex gap-4">
        {/* Responsible planet */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex items-center gap-3">
          <span className="text-3xl">{ruling.emoji}</span>
          <div>
            <div className="text-xs text-indigo-300/60 uppercase tracking-wider">Ruling planet</div>
            <div className="text-white font-medium">{ruling.planet}</div>
          </div>
        </div>

        {/* Confidence */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 flex flex-col justify-between gap-2">
          <div className="flex justify-between items-baseline">
            <div className="text-xs text-indigo-300/60 uppercase tracking-wider">Cosmic confidence</div>
            <div className={`text-lg font-bold ${styles.text}`}>{ruling.confidence}%</div>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${styles.bar} transition-all duration-700`}
              style={{ width: `${ruling.confidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
