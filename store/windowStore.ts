"use client";

import { create } from "zustand";

export type WindowId = "linkup" | "projects" | "about" | "resume" | "ai" | "til" | "mail" | "algorithms";

type WindowItem = {
  id: WindowId;
  zIndex: number;
  minimized: boolean;
};

type WindowStore = {
  windows: WindowItem[];
  activeWindowId: WindowId | null;
  startMenuOpen: boolean;
  topZIndex: number;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
};

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  activeWindowId: null,
  startMenuOpen: false,
  topZIndex: 10,

  openWindow: (id) => {
    const { windows, topZIndex } = get();
    const existing = windows.find((w) => w.id === id);

    if (existing) {
      set({
        windows: windows.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: topZIndex + 1 } : w)),
        activeWindowId: id,
        topZIndex: topZIndex + 1,
        startMenuOpen: false,
      });
      return;
    }

    set({
      windows: [
        ...windows,
        {
          id,
          zIndex: topZIndex + 1,
          minimized: false,
        },
      ],
      activeWindowId: id,
      topZIndex: topZIndex + 1,
      startMenuOpen: false,
    });
  },

  closeWindow: (id) => {
    const remaining = get().windows.filter((w) => w.id !== id);
    set({
      windows: remaining,
      activeWindowId: remaining.length ? remaining[remaining.length - 1].id : null,
    });
  },

  focusWindow: (id) => {
    const { windows, topZIndex } = get();
    set({
      windows: windows.map((w) => (w.id === id ? { ...w, zIndex: topZIndex + 1, minimized: false } : w)),
      activeWindowId: id,
      topZIndex: topZIndex + 1,
    });
  },

  minimizeWindow: (id) => {
    set({
      windows: get().windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
      activeWindowId: get().activeWindowId === id ? null : get().activeWindowId,
    });
  },

  restoreWindow: (id) => {
    const { windows, topZIndex } = get();
    set({
      windows: windows.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: topZIndex + 1 } : w)),
      activeWindowId: id,
      topZIndex: topZIndex + 1,
    });
  },

  toggleStartMenu: () => set((state) => ({ startMenuOpen: !state.startMenuOpen })),
  closeStartMenu: () => set({ startMenuOpen: false }),
}));
