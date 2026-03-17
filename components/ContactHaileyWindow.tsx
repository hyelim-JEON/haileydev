"use client";

import { FormEvent, useMemo, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

type Props = {
  contactEmail?: string;
};

export default function ContactHaileyWindow({ contactEmail = "haileyindev@gmail.com" }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const canSend = useMemo(() => {
    return email.trim().length > 0 && message.trim().length > 0 && status !== "sending";
  }, [email, message, status]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    setStatus("sending");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message.");
      }

      setStatus("success");
      setFeedback("Your message has been sent to Hailey.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send message.";
      setStatus("error");
      setFeedback(errorMessage);
    }
  }

  return (
    <div className="flex h-full w-full min-h-0 flex-col overflow-hidden bg-[#d4d0c8]">
      <div className="border-b border-[#808080] bg-[#efefef] px-3 py-2 text-[12px] text-[#222]">Send a message directly to Hailey.</div>

      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-3">
        <div>
          <label className="mb-1 block text-[12px] font-bold text-black">To</label>
          <input
            value={contactEmail}
            readOnly
            className="w-full border border-[#7f9db9] bg-[#ece9d8] px-2 py-2 text-[13px] text-[#333] outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-bold text-black">Your name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full border border-[#7f9db9] bg-white px-2 py-2 text-[13px] text-black outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-[12px] font-bold text-black">Your email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            type="email"
            className="w-full border border-[#7f9db9] bg-white px-2 py-2 text-[13px] text-black outline-none"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <label className="mb-1 block text-[12px] font-bold text-black">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here..."
            className="min-h-[140px] flex-1 resize-none border border-[#7f9db9] bg-white px-2 py-2 text-[13px] text-black outline-none"
          />
        </div>

        {feedback && (
          <div
            className={`border px-2 py-2 text-[12px] ${
              status === "success" ? "border-[#5d7f5d] bg-[#edf7ed] text-[#234223]" : "border-[#9a7a7a] bg-[#fff1f1] text-[#6b2222]"
            }`}
          >
            {feedback}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="text-[11px] text-[#444]">Replies will go to your email.</div>

          <button
            type="submit"
            disabled={!canSend}
            className="min-w-[112px] border border-[#808080] bg-gradient-to-b from-[#fcfcfc] to-[#d9d3c3] px-4 py-1.5 text-[12px] font-bold text-black disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
