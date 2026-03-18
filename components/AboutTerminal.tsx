"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type CommandName = "help" | "about" | "skills" | "experience" | "contact" | "coffee" | "clear";

type HistoryItem = { type: "input"; value: string } | { type: "output"; value: React.ReactNode };

const COMMANDS: CommandName[] = ["help", "about", "skills", "experience", "contact", "coffee", "clear"];

export default function AboutTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      type: "output",
      value: (
        <div className="space-y-1">
          <p>Welcome to Hailey&apos;s terminal.</p>
          <p>
            Type <span className="text-emerald-400">help</span> to see available commands.
          </p>
        </div>
      ),
    },
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompt = useMemo(() => "hailey@portfolio:~$", []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const pushOutput = (value: React.ReactNode) => {
    setHistory((prev) => [...prev, { type: "output", value }]);
  };

  const handleCommand = (rawValue: string) => {
    const value = rawValue.trim().toLowerCase();

    setHistory((prev) => [...prev, { type: "input", value: rawValue }]);

    if (!value) {
      pushOutput(<span className="text-zinc-500"> </span>);
      return;
    }

    if (value === "clear") {
      setHistory([]);
      return;
    }

    if (value === "help") {
      pushOutput(
        <div className="space-y-1">
          <p className="text-emerald-400">Available commands:</p>
          <p>
            <span className="text-zinc-300">about</span> - about Hailey
          </p>
          <p>
            <span className="text-zinc-300">skills</span> - tech stack
          </p>
          <p>
            <span className="text-zinc-300">experience</span> - background
          </p>
          <p>
            <span className="text-zinc-300">contact</span> - contact info
          </p>
          <p>
            <span className="text-zinc-300">coffee</span> - fun fact
          </p>
          <p>
            <span className="text-zinc-300">clear</span> - clear terminal
          </p>
          <p>
            <span className="text-zinc-300">github</span> - move to github
          </p>
        </div>,
      );
      return;
    }

    if (value === "about") {
      pushOutput(
        <div className="space-y-1">
          <p>Hi, I&apos;m Hailey 👋</p>
          <p>I&apos;m a frontend / full-stack developer with a strong eye for user-centric design and intuitive interfaces.</p>
          <p>I enjoy building interactive digital experiences with React, TypeScript, React Native, and modern backend tools.</p>
        </div>,
      );
      return;
    }

    if (value === "skills") {
      pushOutput(
        <div className="space-y-2">
          <div>
            <p className="text-emerald-400">Frontend</p>
            <p>React, Next.js, TypeScript, React Native, Tailwind CSS</p>
          </div>
          <div>
            <p className="text-emerald-400">Backend</p>
            <p>Node.js, Express, Supabase, Firebase</p>
          </div>
          <div>
            <p className="text-emerald-400">Tools</p>
            <p>GitHub, Figma, Vercel, Docker</p>
          </div>
        </div>,
      );
      return;
    }

    if (value === "experience") {
      pushOutput(
        <div className="space-y-1">
          <p>I enjoy turning ideas into polished, usable products with a strong UX focus.</p>
          <p>My work includes responsive web experiences, mobile app interfaces, and portfolio-style interactive UI concepts.</p>
          <p>I&apos;m especially interested in building products that feel both functional and memorable.</p>
        </div>,
      );
      return;
    }

    if (value === "contact") {
      pushOutput(
        <div className="space-y-1">
          <p>
            GitHub:{" "}
            <a href="https://github.com/your-github" target="_blank" rel="noreferrer" className="text-sky-400 underline underline-offset-4">
              github.com/your-github
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer" className="text-sky-400 underline underline-offset-4">
              linkedin.com/in/your-linkedin
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:your@email.com" className="text-sky-400 underline underline-offset-4">
              your@email.com
            </a>
          </p>
        </div>,
      );
      return;
    }

    if (value === "github") {
      window.open("https://github.com/hyelim-JEON", "_blank");
      pushOutput(<p>Opening GitHub...</p>);
      return;
    }

    if (value === "coffee") {
      pushOutput(
        <div className="space-y-1">
          <p>☕ Fun fact:</p>
          <p>I also have barista experience and enjoy the craft behind coffee, detail, and service.</p>
        </div>,
      );
      return;
    }

    pushOutput(
      <p>
        Command not found: <span className="text-red-400">{rawValue}</span>. Type <span className="text-emerald-400">help</span>.
      </p>,
    );
  };

  const submitCommand = () => {
    const current = input;
    if (current.trim()) {
      setCommandHistory((prev) => [...prev, current]);
    }
    setHistoryIndex(null);
    setInput("");
    handleCommand(current);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitCommand();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      if (historyIndex === null) return;

      const nextIndex = historyIndex + 1;

      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
        return;
      }

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }
  };

  return (
    <div
      onClick={focusInput}
      className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-[#0b0f14] shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
        <p className="text-sm font-medium text-zinc-300">Terminal</p>
        <div className="w-[52px]" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 font-mono text-[14px] leading-7 text-zinc-100">
        {history.map((item, index) => {
          if (item.type === "input") {
            return (
              <div key={index} className="flex flex-wrap gap-2">
                <span className="text-emerald-400">{prompt}</span>
                <span className="break-all text-zinc-100">{item.value}</span>
              </div>
            );
          }

          return (
            <div key={index} className="mb-2 whitespace-pre-wrap text-zinc-300">
              {item.value}
            </div>
          );
        })}

        <div className="flex items-center gap-2">
          <span className="shrink-0 text-emerald-400">{prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="w-full bg-transparent text-zinc-100 outline-none placeholder:text-zinc-600"
            placeholder="type a command..."
          />
        </div>
      </div>
    </div>
  );
}
