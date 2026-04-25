"use client";

import { useState, type FormEvent } from "react";

interface SearchBoxProps {
  onSubmit: (question: string) => void;
}

export default function SearchBox({ onSubmit }: SearchBoxProps) {
  const [question, setQuestion] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = question.trim();
    if (trimmed) onSubmit(trimmed);
  }

  function handleFeeling() {
    const prompts = [
      "Should I quit my job and become a lighthouse keeper?",
      "Should I text my ex at 2am?",
      "Should I eat the leftovers that have been in the fridge for 6 days?",
      "Should I tell my boss what I really think?",
      "Should I adopt another cat?",
      "Should I move to a different country on a whim?",
      "Should I start a podcast?",
      "Should I invest my savings in something my cousin told me about?",
    ];
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setQuestion(random);
    onSubmit(random);
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl">
      {/* Logo */}
      <div className="text-center">
        <h1 className="text-6xl font-normal tracking-tight drop-shadow-lg">
          <span className="text-blue-400">S</span>
          <span className="text-red-400">h</span>
          <span className="text-yellow-300">o</span>
          <span className="text-blue-400">u</span>
          <span className="text-green-400">l</span>
          <span className="text-red-400">d</span>
          <span className="text-white"> I?</span>
        </h1>
        <p className="text-indigo-300 text-sm mt-2 tracking-wide">
          Cosmic rulings for earthly decisions
        </p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg focus-within:border-indigo-400/60 focus-within:bg-white/15 transition-all w-full gap-3">
          <svg
            className="w-5 h-5 text-indigo-300 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Should I..."
            maxLength={500}
            className="flex-1 outline-none text-white text-base bg-transparent placeholder-indigo-400/60"
            autoFocus
          />
          {question && (
            <button
              type="button"
              onClick={() => setQuestion("")}
              className="text-indigo-300 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            type="submit"
            disabled={!question.trim()}
            className="px-5 py-2 bg-white/10 text-indigo-200 text-sm rounded border border-white/20 hover:bg-white/20 hover:border-white/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
          >
            Ask the Cosmos
          </button>
          <button
            type="button"
            onClick={handleFeeling}
            className="px-5 py-2 bg-white/10 text-indigo-200 text-sm rounded border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all backdrop-blur-sm"
          >
            I&apos;m Feeling Cosmic
          </button>
        </div>
      </form>
    </div>
  );
}
