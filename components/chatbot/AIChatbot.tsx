
"use client";

import { useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! Welcome to Bright Bal Public School. I'm your AI assistant. Ask me about school information or any general question.",
    },
  ]);

  async function sendMessage(text = input) {
    const question = text.trim();

    if (!question || loading) return;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: question },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.slice(-20),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[80]">
      {open && (
        <section className="mb-4 flex h-[min(520px,75vh)] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between bg-[#101B33] p-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Bot size={23} />
              </span>
              <div>
                <h2 className="font-bold">School AI Assistant</h2>
                <p className="text-xs text-white/70">
                  Bright Bal Public School
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
              className="rounded-lg p-2 hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-sm bg-[#C62828] text-white"
                      : "rounded-bl-sm border border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {loading && (
              <p className="text-sm text-slate-500">
                AI is thinking...
              </p>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage();
            }}
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask me anything..."
              maxLength={4000}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-3 text-sm text-slate-800 outline-none focus:border-[#C62828]"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C62828] text-white disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Close AI chatbot" : "Open AI chatbot"}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C62828] text-white shadow-xl transition hover:scale-105"
      >
        {open ? <X size={25} /> : <MessageCircle size={27} />}
      </button>
    </div>
  );
}
