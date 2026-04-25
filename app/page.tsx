"use client";

import { useState } from "react";
import SearchBox from "@/components/SearchBox";
import CosmicRulingDisplay from "@/components/CosmicRuling";
import LoadingCosmos from "@/components/LoadingCosmos";
import type { CosmicRuling } from "@/lib/ruling";

type State =
  | { status: "idle" }
  | { status: "loading"; question: string }
  | { status: "result"; question: string; ruling: CosmicRuling }
  | { status: "error"; question: string; message: string };

export default function Home() {
  const [state, setState] = useState<State>({ status: "idle" });

  async function handleSubmit(question: string) {
    setState({ status: "loading", question });

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({ status: "error", question, message: data.error ?? "The cosmos returned an error." });
        return;
      }

      setState({ status: "result", question, ruling: data });
    } catch {
      setState({
        status: "error",
        question,
        message: "Could not reach the cosmos. Check your connection and try again.",
      });
    }
  }

  function reset() {
    setState({ status: "idle" });
  }

  return (
    <>
      {/* Starfield layers */}
      <div className="stars-sm" />
      <div className="stars-md" />
      <div className="stars-lg" />
      <div className="moon" />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 gap-10">
        {state.status === "idle" && (
          <SearchBox onSubmit={handleSubmit} />
        )}

        {state.status === "loading" && (
          <>
            <p className="text-indigo-300 text-sm">&ldquo;{state.question}&rdquo;</p>
            <LoadingCosmos />
          </>
        )}

        {state.status === "result" && (
          <>
            <CosmicRulingDisplay ruling={state.ruling} question={state.question} />
            <button
              onClick={reset}
              className="px-5 py-2 bg-white/10 text-indigo-200 text-sm rounded border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all backdrop-blur-sm"
            >
              Ask Again
            </button>
          </>
        )}

        {state.status === "error" && (
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <span className="text-4xl">🪐</span>
            <p className="text-white font-medium">The cosmos are unavailable</p>
            <p className="text-indigo-300 text-sm">{state.message}</p>
            <button
              onClick={reset}
              className="px-5 py-2 bg-white/10 text-indigo-200 text-sm rounded border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="fixed bottom-4 text-xs text-indigo-400/60">
          Powered by real planetary positions and cosmic bureaucracy
        </footer>
      </main>
    </>
  );
}
