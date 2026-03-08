"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type AskHaileyResponse = {
  answer: string;
  remaining?: number;
};

const STORAGE_KEY = "hailey-ai-chat-history";

const starterMessage = `Hi, I'm Hailey's portfolio assistant.

You can ask me about:
• Hailey's projects
• Technical skills
• LinkUp
• What she has been learning
• Career goals`;

const suggestedQuestions = ["What makes Hailey a strong candidate?", "What did Hailey build in LinkUp?", "What technologies did Hailey use and why?"];

async function askHailey(message: string) {
  const res = await fetch("/api/ask-hailey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const text = await res.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("Invalid JSON response:", text);
    throw new Error("The assistant returned an invalid response.");
  }

  if (!res.ok) {
    throw new Error(data?.answer || "Something went wrong.");
  }

  return data as { answer: string; remaining?: number };
}

export default function AIChatWindow() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: starterMessage,
    },
  ]);
  const [showJumpButton, setShowJumpButton] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  function isNearBottom() {
    const el = scrollContainerRef.current;
    if (!el) return true;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

    return distanceFromBottom < 80;
  }

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    bottomRef.current?.scrollIntoView({
      behavior,
      block: "end",
    });
  }

  function handleScroll() {
    const nearBottom = isNearBottom();
    shouldAutoScrollRef.current = nearBottom;
    setShowJumpButton(!nearBottom);
  }

  async function streamAssistantMessage(fullText: string) {
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    const chunkSize = 3;
    const delay = 14;

    for (let i = 0; i < fullText.length; i += chunkSize) {
      const chunk = fullText.slice(i, i + chunkSize);

      setMessages((prev) => {
        const next = [...prev];
        const lastIndex = next.length - 1;

        if (lastIndex >= 0 && next[lastIndex].role === "assistant") {
          next[lastIndex] = {
            ...next[lastIndex],
            text: next[lastIndex].text + chunk,
          };
        }

        return next;
      });

      if (shouldAutoScrollRef.current) {
        requestAnimationFrame(() => scrollToBottom("auto"));
      } else {
        setShowJumpButton(true);
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
      // ignore invalid localStorage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollToBottom("auto");
  }, []);

  async function handleSend(customText?: string) {
    const raw = customText ?? input;
    if (!raw.trim() || loading) return;

    const userText = raw.trim();

    shouldAutoScrollRef.current = isNearBottom();

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    if (shouldAutoScrollRef.current) {
      requestAnimationFrame(() => scrollToBottom("smooth"));
    } else {
      setShowJumpButton(true);
    }

    try {
      const data = await askHailey(userText);
      setRemaining(typeof data.remaining === "number" ? data.remaining : null);
      await streamAssistantMessage(data.answer);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong while contacting the assistant.";

      await streamAssistantMessage(message);
    } finally {
      setLoading(false);

      if (shouldAutoScrollRef.current) {
        requestAnimationFrame(() => scrollToBottom("smooth"));
        setShowJumpButton(false);
      } else {
        setShowJumpButton(true);
      }
    }
  }

  function clearChat() {
    const reset = [{ role: "assistant" as const, text: starterMessage }];
    setMessages(reset);
    setRemaining(null);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
    shouldAutoScrollRef.current = true;
    setShowJumpButton(false);

    requestAnimationFrame(() => {
      scrollToBottom("auto");
    });
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#ece9d8]">
      <div className="border-b border-[#a89f8b] bg-gradient-to-b from-[#f8f6ee] to-[#e5ddc8] px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-[#2e2a21]">Hailey Messenger</div>
            <div className="mt-0.5 text-[11px] text-[#5b5548]">Portfolio assistant is online</div>
          </div>

          <div className="flex items-center gap-2">
            {remaining !== null && <div className="text-[11px] text-[#5b5548]">Remaining this month: {remaining}</div>}

            <button
              type="button"
              onClick={clearChat}
              className="border border-[#9b9485] bg-gradient-to-b from-[#fcfcfc] to-[#ddd7c8] px-2.5 py-1 text-[11px] text-black hover:brightness-[0.98]"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-[#c8c0aa] bg-[#f3efe3] px-4 py-2">
        <div className="mb-1 text-[11px] font-bold text-[#4a4438]">Try asking</div>

        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => handleSend(question)}
              disabled={loading}
              className="text-[11px] text-[#0b57d0] underline underline-offset-2 disabled:opacity-60"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 bg-white">
        <div ref={scrollContainerRef} onScroll={handleScroll} className="h-full overflow-y-auto px-4 py-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col">
                <div className={`mb-1 text-[11px] ${msg.role === "user" ? "text-right text-[#4b648e]" : "text-left text-[#6b614d]"}`}>
                  {msg.role === "user" ? "You" : "Hailey Assistant"}
                </div>

                <div
                  className={`max-w-[88%] rounded border px-3 py-2 text-sm leading-6 whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "ml-auto border-[#8ea9d6] bg-[#e3efff] text-[#20324d]"
                      : "mr-auto border-[#d2cab7] bg-[#f7f3e8] text-[#2d2a22]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex flex-col">
                <div className="mb-1 text-[11px] text-left text-[#6b614d]">Hailey Assistant</div>
                <div className="mr-auto max-w-[88%] rounded border border-[#d2cab7] bg-[#f7f3e8] px-3 py-2 text-sm text-[#2d2a22]">Thinking...</div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {showJumpButton && (
          <button
            type="button"
            onClick={() => {
              shouldAutoScrollRef.current = true;
              setShowJumpButton(false);
              scrollToBottom("smooth");
            }}
            className="absolute bottom-3 right-3 border border-[#8f8a7b] bg-gradient-to-b from-[#fcfcfc] to-[#d9d3c3] px-3 py-1.5 text-[11px] text-black shadow"
          >
            Jump to latest
          </button>
        )}
      </div>

      <div className="border-t border-[#b7b09c] bg-[#ece9d8] p-3">
        <div className="mb-2 text-[11px] text-[#5a5347]">Message</div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your question here..."
            className="flex-1 border border-[#7f9db9] bg-white px-3 py-2 text-sm outline-none"
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!canSend}
            className="min-w-[90px] border border-[#8f8a7b] bg-gradient-to-b from-[#fcfcfc] to-[#d9d3c3] px-4 py-2 text-sm text-black disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
