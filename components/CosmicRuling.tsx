"use client";

import type { CosmicRuling } from "@/lib/ruling";

interface CosmicRulingProps {
  ruling: CosmicRuling;
  question: string;
}

const VERDICT_STYLES = {
  YES: {
    text: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    bar: "bg-green-400",
  },
  NO: {
    text: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    bar: "bg-red-400",
  },
  MAYBE: {
    text: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    bar: "bg-yellow-400",
  },
};

export default function CosmicRulingDisplay({ ruling, question }: CosmicRulingProps) {
  const styles = VERDICT_STYLES[ruling.verdict];

  return (
    <div className="w-full max-w-2xl flex flex-col gap-5">
      {/* Question recap */}
      <p className="text-gray-400 text-sm text-center truncate">
        &ldquo;{question}&rdquo;
      </p>

      {/* Verdict card */}
      <div className={`rounded-2xl border ${styles.border} ${styles.bg} p-6 flex flex-col items-center gap-3`}>
        <div className={`text-7xl font-bold tracking-tight ${styles.text}`}>
          {ruling.verdict}
        </div>
        <div className="text-gray-600 text-lg font-medium text-center">
          {ruling.headline}
        </div>
      </div>

      {/* Reasoning */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-600 text-sm leading-relaxed">
        {ruling.reasoning}
      </div>

      {/* Planet + confidence row */}
      <div className="flex gap-4">
        {/* Responsible planet */}
        <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-4 flex items-center gap-3">
          <span className="text-3xl">{ruling.emoji}</span>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Ruling planet</div>
            <div className="text-gray-700 font-medium">{ruling.planet}</div>
          </div>
        </div>

        {/* Confidence */}
        <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-4 flex flex-col justify-between gap-2">
          <div className="flex justify-between items-baseline">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Cosmic confidence</div>
            <div className={`text-lg font-bold ${styles.text}`}>{ruling.confidence}%</div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
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
