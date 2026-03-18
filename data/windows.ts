import type { WindowId } from "@/store/windowStore";

export const desktopItems: { id: WindowId; label: string; emoji: string }[] = [
  { id: "linkup", label: "LinkUp.exe", emoji: "📍" },
  { id: "projects", label: "Projects", emoji: "💼" },
  { id: "about", label: "About Me", emoji: "👩🏻" },
  // { id: "resume", label: "Resume.txt", emoji: "📄" },
  { id: "ai", label: "Ask Hailey AI", emoji: "🤖" },
  { id: "til", label: "TIL Notes", emoji: "📝" },
  { id: "mail", label: "contact", emoji: "✉️" },
];
