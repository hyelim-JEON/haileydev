"use client";

import { desktopItems } from "@/data/windows";
import { useWindowStore } from "@/store/windowStore";

export default function StartMenu() {
  const openWindow = useWindowStore((state) => state.openWindow);

  return (
    <div className="absolute bottom-10 left-1 z-[999] flex w-[300px] overflow-hidden rounded-t-md border border-[#0b3f75] shadow-2xl">
      <div className="flex w-16 items-end bg-gradient-to-b from-[#0b57d0] to-[#003b8e] p-2">
        <div className="[writing-mode:vertical-rl] rotate-180 text-sm font-bold text-white">Hailey Portfolio</div>
      </div>

      <div className="flex-1 bg-[#f3f7ff] p-2">
        {desktopItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openWindow(item.id)}
            className="flex w-full items-center gap-3 rounded px-3 py-2 text-left hover:bg-[#316ac5] hover:text-white"
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
