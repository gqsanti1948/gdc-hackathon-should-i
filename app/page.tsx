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
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 gap-10">
      {state.status === "idle" && (
        <SearchBox onSubmit={handleSubmit} />
      )}

      {state.status === "loading" && (
        <>
          <p className="text-gray-400 text-sm">&ldquo;{state.question}&rdquo;</p>
          <LoadingCosmos />
        </>
      )}

      {state.status === "result" && (
        <>
          <CosmicRulingDisplay ruling={state.ruling} question={state.question} />
          <button
            onClick={reset}
            className="px-5 py-2 bg-gray-50 text-gray-700 text-sm rounded border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all"
          >
            Ask Again
          </button>
        </>
      )}

      {state.status === "error" && (
        <div className="flex flex-col items-center gap-4 max-w-md text-center">
          <span className="text-4xl">🪐</span>
          <p className="text-gray-700 font-medium">The cosmos are unavailable</p>
          <p className="text-gray-400 text-sm">{state.message}</p>
          <button
            onClick={reset}
            className="px-5 py-2 bg-gray-50 text-gray-700 text-sm rounded border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="fixed bottom-4 text-xs text-gray-300">
        Powered by real planetary positions and cosmic bureaucracy
      </footer>
    </main>
  );
}
