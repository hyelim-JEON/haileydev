"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
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

function getViewport() {
  if (typeof window === "undefined") {
    return { width: 1280, height: 800 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function WindowFrame({ id, title, defaultPosition, zIndex, children, defaultWidth, defaultHeight }: Props) {
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  const [viewport, setViewport] = useState(getViewport);

  useEffect(() => {
    const updateViewport = () => {
      setViewport(getViewport());
    };

    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const isMobile = viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1100;
  const margin = isMobile ? 8 : 16;

  const resolvedDefaultWidth = defaultWidth ?? (id === "ai" ? 760 : id === "mail" ? 560 : 620);

  const resolvedDefaultHeight = defaultHeight ?? (id === "ai" ? 560 : id === "mail" ? 620 : 460);

  const resolvedMinWidth = id === "projects" ? 900 : id === "about" ? 700 : id === "ai" ? 620 : id === "mail" ? 520 : 420;

  const resolvedMinHeight = id === "projects" ? 620 : id === "about" ? 520 : id === "ai" ? 420 : id === "mail" ? 520 : 260;

  const responsiveDefaultWidth = useMemo(() => {
    if (isMobile) return Math.max(viewport.width - margin * 2, 280);
    if (isTablet) return Math.min(resolvedDefaultWidth, viewport.width - 48);
    return resolvedDefaultWidth;
  }, [isMobile, isTablet, viewport.width, margin, resolvedDefaultWidth]);

  const responsiveDefaultHeight = useMemo(() => {
    if (isMobile) return Math.max(viewport.height - margin * 2, 420);
    if (isTablet) return Math.min(resolvedDefaultHeight, viewport.height - 56);
    return resolvedDefaultHeight;
  }, [isMobile, isTablet, viewport.height, margin, resolvedDefaultHeight]);

  const clampPosition = (x: number, y: number, width: number, height: number) => {
    const maxX = Math.max(margin, viewport.width - width - margin);
    const maxY = Math.max(margin, viewport.height - height - margin);

    return {
      x: Math.min(Math.max(x, margin), maxX),
      y: Math.min(Math.max(y, margin), maxY),
    };
  };

  const [size, setSize] = useState({
    width: resolvedDefaultWidth,
    height: resolvedDefaultHeight,
  });

  const [position, setPosition] = useState({
    x: defaultPosition.x,
    y: defaultPosition.y,
  });

  const desktopWidth = Math.min(Number(size.width), viewport.width - margin * 2);
  const desktopHeight = Math.min(Number(size.height), viewport.height - margin * 2);

  const finalWidth = isMobile ? responsiveDefaultWidth : desktopWidth;
  const finalHeight = isMobile ? responsiveDefaultHeight : desktopHeight;

  const finalPosition = isMobile ? { x: margin, y: margin } : clampPosition(position.x, position.y, finalWidth, finalHeight);

  return (
    <Rnd
      size={{ width: finalWidth, height: finalHeight }}
      position={finalPosition}
      minWidth={isMobile ? finalWidth : resolvedMinWidth}
      minHeight={isMobile ? finalHeight : resolvedMinHeight}
      maxWidth={viewport.width - margin * 2}
      maxHeight={viewport.height - margin * 2}
      bounds="window"
      dragHandleClassName="xp-titlebar"
      disableDragging={isMobile}
      enableResizing={!isMobile}
      onDragStart={() => focusWindow(id)}
      onDragStop={(_, d) => {
        setPosition(clampPosition(d.x, d.y, finalWidth, finalHeight));
      }}
      onResizeStart={() => focusWindow(id)}
      onResizeStop={(_, __, ref, ___, newPosition) => {
        const nextWidth = ref.offsetWidth;
        const nextHeight = ref.offsetHeight;

        setSize({
          width: nextWidth,
          height: nextHeight,
        });
        setPosition(clampPosition(newPosition.x, newPosition.y, nextWidth, nextHeight));
      }}
      style={{ zIndex }}
      className={`overflow-hidden border border-[#0a4ea3] bg-[#ece9d8] shadow-2xl ${isMobile ? "rounded-lg" : "rounded-[3px]"}`}
    >
      <div className="flex h-full min-h-0 flex-col border border-white/40 bg-[#ece9d8] p-[2px]" onMouseDown={() => focusWindow(id)}>
        <div
          className={`xp-titlebar flex items-center justify-between bg-gradient-to-r from-[#0a4ea3] to-[#2a7de1] px-2 py-1 text-white ${
            isMobile ? "cursor-default" : "cursor-move"
          }`}
        >
          <div className="truncate text-sm font-bold">{title}</div>

          <div className="ml-2 flex items-center gap-1">
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
