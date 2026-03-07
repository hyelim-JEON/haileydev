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
};

export default function WindowFrame({ id, title, defaultPosition, zIndex, children }: Props) {
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  const [size, setSize] = useState({ width: 620, height: 460 });
  const [position, setPosition] = useState({
    x: defaultPosition.x,
    y: defaultPosition.y,
  });

  return (
    <Rnd
      size={size}
      position={position}
      minWidth={420}
      minHeight={260}
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
      <div className="flex h-full flex-col border border-white/40 bg-[#ece9d8] p-[2px]" onMouseDown={() => focusWindow(id)}>
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

        <div className="flex-1 overflow-hidden border-t border-[#7aa7e5] bg-[#f9f8f2]">
          <div className="h-full overflow-auto p-5 text-[#1d1d1d]">{children}</div>
        </div>
      </div>
    </Rnd>
  );
}
