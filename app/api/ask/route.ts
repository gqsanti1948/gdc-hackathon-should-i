import { NextRequest, NextResponse } from "next/server";
import { getRuling } from "@/lib/ruling";

export async function POST(req: NextRequest) {
  let question: string;

  try {
    const body = await req.json();
    question = body?.question;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Expected JSON with a question field." },
      { status: 400 }
    );
  }

  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json(
      { error: "A question is required. The cosmos cannot rule on nothing." },
      { status: 400 }
    );
  }

  if (question.trim().length > 500) {
    return NextResponse.json(
      { error: "Question too long. The cosmos have a 500-character attention span." },
      { status: 400 }
    );
  }

  try {
    const ruling = await getRuling(question.trim());
    return NextResponse.json(ruling);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : String(err) || "Unknown cosmic disturbance.";
    console.error("[/api/ask] Ruling failed:", err);
    return NextResponse.json(
      { error: `The cosmos are unavailable: ${message}` },
      { status: 500 }
    );
  }
}
