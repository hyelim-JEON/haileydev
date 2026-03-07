"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/store/windowStore";

export default function Taskbar() {
  const windows = useWindowStore((state) => state.windows);
  const activeWindowId = useWindowStore((state) => state.activeWindowId);
  const startMenuOpen = useWindowStore((state) => state.startMenuOpen);
  const toggleStartMenu = useWindowStore((state) => state.toggleStartMenu);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const restoreWindow = useWindowStore((state) => state.restoreWindow);

  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      );
    };

    update();
    const interval = setInterval(update, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1000] h-10 border-t border-[#245edb] bg-gradient-to-b from-[#3c8df6] to-[#1c5ed6] px-1">
      <div className="flex h-full items-center gap-1">
        <button
          type="button"
          onClick={toggleStartMenu}
          className={`h-8 min-w-[78px] rounded-full border px-4 text-sm font-bold text-white shadow-inner ${
            startMenuOpen
              ? "border-[#245c1f] bg-gradient-to-b from-[#4bd44b] to-[#2f8f2f]"
              : "border-[#2f7c2f] bg-gradient-to-b from-[#46d646] to-[#2b952b]"
          }`}
        >
          Start
        </button>

        <div className="flex flex-1 items-center gap-1 overflow-x-auto">
          {windows.map((window) => (
            <button
              key={window.id}
              type="button"
              onClick={() => (window.minimized ? restoreWindow(window.id) : focusWindow(window.id))}
              className={`h-8 min-w-[120px] max-w-[180px] truncate rounded border px-3 text-left text-xs text-white ${
                activeWindowId === window.id && !window.minimized ? "border-[#9bc2ff] bg-[#4b82f1]" : "border-[#2155b7] bg-[#2f68d8]"
              }`}
            >
              {window.id}
            </button>
          ))}
        </div>

        <div className="flex h-8 min-w-[82px] items-center justify-center rounded border border-[#86b8ff] bg-[#0b57d0] px-2 text-xs text-white">
          {time}
        </div>
      </div>
    </div>
  );
}
