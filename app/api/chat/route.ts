
import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    // Check credentials when a request arrives, not during build.
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI chatbot is not configured yet." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const messages = body.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    if (messages.length > 20) {
      return NextResponse.json(
        { error: "Please start a new conversation." },
        { status: 400 }
      );
    }

    const safeMessages = messages.map(
      (message: { role: string; content: string }) => {
        if (
          !["user", "assistant"].includes(message.role) ||
          typeof message.content !== "string" ||
          message.content.length > 4000
        ) {
          throw new Error("Invalid message format.");
        }

        return {
          role: message.role as "user" | "assistant",
          content: message.content,
        };
      }
    );

    // Initialize the client only after confirming the API key exists.
    const openai = new OpenAI({ apiKey });

    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      instructions: `
You are the AI assistant for Bright Bal Public School, Agra.

Be friendly, professional, concise, and helpful.
You can answer general educational questions and general AI questions.

School information:
- School name: Bright Bal Public School.
- Location: Agra, Uttar Pradesh, India.
- Classes: Nursery to Class VIII.

Never invent school fees, timings, phone numbers, admission
requirements, results, or other unverified school information.
If you do not know a school-specific answer, politely ask the
visitor to contact the school directly.

Do not claim that an admission, payment, or form submission
has been completed. You are an informational chatbot only.
`,
      input: safeMessages,
      max_output_tokens: 600,
    });

    return NextResponse.json({
      reply: response.output_text || "Sorry, I couldn't generate a reply.",
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Unable to respond right now. Please try again." },
      { status: 500 }
    );
  }
}
