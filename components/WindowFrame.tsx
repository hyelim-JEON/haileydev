"use client";

import { ReactNode, useState } from "react";
import { Rnd } from "react-rnd";
import { useWindowStore, type WindowId } from "@/store/windowStore";

type Props = {
  id: WindowId;
  title: string;
  defaultPosition: { x: number; y: number };
  zIndex: number;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
};

export default function WindowFrame({ id, title, defaultPosition, zIndex, children, defaultWidth, defaultHeight }: Props) {
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  const resolvedDefaultWidth = defaultWidth ?? (id === "ai" ? 760 : id === "mail" ? 560 : 620);

  const resolvedDefaultHeight = defaultHeight ?? (id === "ai" ? 560 : id === "mail" ? 620 : 460);

  const resolvedMinWidth = id === "projects" ? 900 : id === "about" ? 700 : id === "ai" ? 620 : id === "mail" ? 520 : 420;

  const resolvedMinHeight = id === "projects" ? 620 : id === "about" ? 520 : id === "ai" ? 420 : id === "mail" ? 520 : 260;

  const [size, setSize] = useState({
    width: resolvedDefaultWidth,
    height: resolvedDefaultHeight,
  });

  const [position, setPosition] = useState({
    x: defaultPosition.x,
    y: defaultPosition.y,
  });

  return (
    <Rnd
      size={size}
      position={position}
      minWidth={resolvedMinWidth}
      minHeight={resolvedMinHeight}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      onDragStart={() => focusWindow(id)}
      onDragStop={(_, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      onResizeStart={() => focusWindow(id)}
      onResizeStop={(_, __, ref, ___, newPosition) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
        setPosition(newPosition);
      }}
      style={{ zIndex }}
      className="overflow-hidden rounded-[3px] border border-[#0a4ea3] bg-[#ece9d8] shadow-2xl"
    >
      <div className="flex h-full min-h-0 flex-col border border-white/40 bg-[#ece9d8] p-[2px]" onMouseDown={() => focusWindow(id)}>
        <div className="xp-titlebar flex cursor-move items-center justify-between bg-gradient-to-r from-[#0a4ea3] to-[#2a7de1] px-2 py-1 text-white">
          <div className="text-sm font-bold">{title}</div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => minimizeWindow(id)}
              className="flex h-5 w-6 items-center justify-center border border-[#ffffffaa] bg-[#d9e8fb] text-xs font-bold text-black"
            >
              _
            </button>
            <button
              type="button"
              onClick={() => closeWindow(id)}
              className="flex h-5 w-6 items-center justify-center border border-[#ffffffaa] bg-[#e35d5b] text-xs font-bold text-white"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 border-t border-[#7aa7e5] bg-[#f9f8f2]">
          <div className="h-full min-h-0 w-full overflow-hidden text-[#1d1d1d]">{children}</div>
        </div>
      </div>
    </Rnd>
  );
}
