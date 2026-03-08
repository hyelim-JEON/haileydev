"use client";

import WindowFrame from "@/components/WindowFrame";
import TilWindow from "@/components/TilWindow";
import { useWindowStore } from "@/store/windowStore";
import AIChatWindow from "@/components/AIChatWindow";

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

export default function WindowManager({ tilPosts }: Props) {
  const windows = useWindowStore((state) => state.windows);

  return (
    <>
      {windows
        .filter((w) => !w.minimized)
        .map((window) => {
          if (window.id === "linkup") {
            return (
              <WindowFrame key={window.id} id="linkup" title="LinkUp.exe" defaultPosition={{ x: 120, y: 70 }} zIndex={window.zIndex}>
                <h2 className="text-2xl font-bold">LinkUp</h2>
                <p className="mt-2 text-sm text-neutral-700">
                  A location-based social meetup app designed to help people discover nearby events and connect offline.
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded border border-[#cfc7b8] bg-white p-4">
                    <h3 className="font-bold">Tech Stack</h3>
                    <p className="mt-2 text-sm">React Native, Expo, TypeScript, Supabase, PostgreSQL</p>
                  </div>

                  <div className="rounded border border-[#cfc7b8] bg-white p-4">
                    <h3 className="font-bold">Highlights</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                      <li>Location-based meetup discovery</li>
                      <li>User authentication and profiles</li>
                      <li>Meetup creation flow</li>
                      <li>Interactive UX thinking</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a href="#" className="rounded border border-[#9b9b9b] bg-[#efefef] px-3 py-1.5 text-sm">
                    GitHub
                  </a>
                  <a href="#" className="rounded border border-[#9b9b9b] bg-[#efefef] px-3 py-1.5 text-sm">
                    Demo
                  </a>
                </div>
              </WindowFrame>
            );
          }

          if (window.id === "projects") {
            return (
              <WindowFrame key={window.id} id="projects" title="Projects" defaultPosition={{ x: 180, y: 110 }} zIndex={window.zIndex}>
                <h2 className="text-2xl font-bold">Projects</h2>
                <p className="mt-2 text-sm text-neutral-700">Add your selected projects here.</p>
              </WindowFrame>
            );
          }

          if (window.id === "about") {
            return (
              <WindowFrame key={window.id} id="about" title="About Me" defaultPosition={{ x: 240, y: 150 }} zIndex={window.zIndex}>
                <h2 className="text-2xl font-bold">About Hailey</h2>
                <p className="mt-2 text-sm text-neutral-700">
                  Frontend / full stack developer with a strong eye for user-centered design and intuitive interfaces.
                </p>
              </WindowFrame>
            );
          }

          if (window.id === "resume") {
            return (
              <WindowFrame key={window.id} id="resume" title="Resume.txt" defaultPosition={{ x: 300, y: 190 }} zIndex={window.zIndex}>
                <h2 className="text-2xl font-bold">Resume</h2>
                <p className="mt-2 text-sm text-neutral-700">Add your real PDF link here.</p>
              </WindowFrame>
            );
          }

          if (window.id === "til") {
            return (
              <WindowFrame key={window.id} id="til" title="TIL Explorer" defaultPosition={{ x: 220, y: 95 }} zIndex={window.zIndex}>
                <TilWindow posts={tilPosts} />
              </WindowFrame>
            );
          }

          if (window.id === "ai") {
            return (
              <WindowFrame key={window.id} id="ai" title="Hailey Messenger" defaultPosition={{ x: 260, y: 90 }} zIndex={window.zIndex}>
                <AIChatWindow />
              </WindowFrame>
            );
          }

          return null;
        })}
    </>
  );
}
