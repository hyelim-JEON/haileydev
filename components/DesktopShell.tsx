"use client";

import DesktopIcon from "@/components/DesktopIcon";
import StartMenu from "@/components/StartMenu";
import Taskbar from "@/components/Taskbar";
import WindowManager from "@/components/WindowManager";
import { desktopItems } from "@/data/windows";
import { useWindowStore } from "@/store/windowStore";

type TilPost = {
  id: string;
  title: string;
  date: string;
  category?: string;
  content: string;
};

type Props = {
  tilPosts: TilPost[];
};

export default function DesktopShell({ tilPosts }: Props) {
  const openWindow = useWindowStore((state) => state.openWindow);
  const startMenuOpen = useWindowStore((state) => state.startMenuOpen);
  const closeStartMenu = useWindowStore((state) => state.closeStartMenu);

  return (
    <main
      className="relative h-screen w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/wallpaper.jpg')" }}
      onClick={() => closeStartMenu()}
    >
      <div className="absolute inset-0 bg-black/5" />

      <div className="absolute left-4 top-4 z-10 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        {desktopItems.map((item) => (
          <DesktopIcon key={item.id} emoji={item.emoji} label={item.label} onOpen={() => openWindow(item.id)} />
        ))}
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <WindowManager tilPosts={tilPosts} />
      </div>

      {startMenuOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <StartMenu />
        </div>
      )}

      <div onClick={(e) => e.stopPropagation()}>
        <Taskbar />
      </div>
    </main>
  );
}
