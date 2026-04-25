"use client";

import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  { emoji: "☀️", text: "Consulting the Sun..." },
  { emoji: "🌙", text: "Waiting for the Moon to respond..." },
  { emoji: "☿️", text: "Mercury is thinking..." },
  { emoji: "♀️", text: "Venus is considering your feelings..." },
  { emoji: "♂️", text: "Mars is fired up about this..." },
  { emoji: "♃", text: "Jupiter is expanding on the matter..." },
  { emoji: "♄", text: "Saturn is reviewing your file..." },
  { emoji: "♅", text: "Uranus is being unpredictable..." },
  { emoji: "♆", text: "Neptune is gazing into the void..." },
  { emoji: "🌌", text: "The cosmos are deliberating..." },
  { emoji: "📋", text: "Cosmic HR is processing your request..." },
  { emoji: "⚖️", text: "Weighing your life choices..." },
];

export default function LoadingCosmos() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % LOADING_MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const current = LOADING_MESSAGES[index];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Orbiting animation */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 animate-spin" style={{ animationDuration: "3s" }}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400" />
        </div>
        <div className="absolute inset-3 rounded-full border-2 border-gray-100 animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }}>
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-yellow-400" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🌌
        </div>
      </div>

      {/* Cycling message */}
      <div
        className="flex items-center gap-2 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span className="text-xl">{current.emoji}</span>
        <span className="text-gray-500 text-sm">{current.text}</span>
      </div>

      {/* Dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
