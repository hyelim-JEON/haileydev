"use client";

import { useEffect, useState } from "react";
import WindowFrame from "@/components/WindowFrame";
import TilWindow from "@/components/TilWindow";
import { useWindowStore } from "@/store/windowStore";
import AIChatWindow from "@/components/AIChatWindow";
import ContactHaileyWindow from "@/components/ContactHaileyWindow";
import AboutTerminal from "@/components/AboutTerminal";
import ProjectsWindow from "@/components/projects/ProjectsWindow";

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

type Viewport = {
  width: number;
  height: number;
};

function getViewport(): Viewport {
  if (typeof window === "undefined") {
    return { width: 1280, height: 800 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function WindowManager({ tilPosts }: Props) {
  const windows = useWindowStore((state) => state.windows);
  const [viewport, setViewport] = useState<Viewport>(getViewport);

  useEffect(() => {
    const handleResize = () => {
      setViewport(getViewport());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1100;

  const getResponsiveFrame = (type: "linkup" | "projects" | "about" | "til" | "ai" | "mail") => {
    if (isMobile) {
      return {
        defaultPosition: { x: 8, y: 8 },
        defaultWidth: Math.max(viewport.width - 16, 280),
        defaultHeight: Math.max(viewport.height - 16, 400),
      };
    }

    if (isTablet) {
      switch (type) {
        case "projects":
          return {
            defaultPosition: { x: 32, y: 32 },
            defaultWidth: Math.min(viewport.width - 64, 920),
            defaultHeight: Math.min(viewport.height - 64, 680),
          };
        case "about":
          return {
            defaultPosition: { x: 40, y: 44 },
            defaultWidth: Math.min(viewport.width - 80, 760),
            defaultHeight: Math.min(viewport.height - 88, 620),
          };
        case "til":
          return {
            defaultPosition: { x: 36, y: 40 },
            defaultWidth: Math.min(viewport.width - 72, 780),
            defaultHeight: Math.min(viewport.height - 80, 640),
          };
        case "ai":
        case "mail":
          return {
            defaultPosition: { x: 44, y: 48 },
            defaultWidth: Math.min(viewport.width - 88, 700),
            defaultHeight: Math.min(viewport.height - 96, 600),
          };
        case "linkup":
        default:
          return {
            defaultPosition: { x: 36, y: 36 },
            defaultWidth: Math.min(viewport.width - 72, 760),
            defaultHeight: Math.min(viewport.height - 72, 560),
          };
      }
    }

    switch (type) {
      case "linkup":
        return {
          defaultPosition: { x: 120, y: 70 },
          defaultWidth: 760,
          defaultHeight: 540,
        };
      case "projects":
        return {
          defaultPosition: { x: 180, y: 110 },
          defaultWidth: 1120,
          defaultHeight: 760,
        };
      case "about":
        return {
          defaultPosition: { x: 240, y: 150 },
          defaultWidth: 820,
          defaultHeight: 620,
        };
      case "til":
        return {
          defaultPosition: { x: 220, y: 95 },
          defaultWidth: 860,
          defaultHeight: 640,
        };
      case "ai":
      case "mail":
        return {
          defaultPosition: { x: 260, y: 90 },
          defaultWidth: 700,
          defaultHeight: 560,
        };
      default:
        return {
          defaultPosition: { x: 120, y: 80 },
          defaultWidth: 800,
          defaultHeight: 600,
        };
    }
  };

  return (
    <>
      {windows
        .filter((w) => !w.minimized)
        .map((windowItem) => {
          if (windowItem.id === "linkup") {
            const frame = getResponsiveFrame("linkup");

            return (
              <WindowFrame
                key={windowItem.id}
                id="linkup"
                title="LinkUp.exe"
                defaultPosition={frame.defaultPosition}
                defaultWidth={frame.defaultWidth}
                defaultHeight={frame.defaultHeight}
                zIndex={windowItem.zIndex}
              >
                <div className="h-full overflow-y-auto p-4 sm:p-5">
                  <h2 className="text-xl font-bold sm:text-2xl">LinkUp</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-700">
                    A location-based social meetup app designed to help people discover nearby events and connect offline.
                  </p>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded border border-[#cfc7b8] bg-white p-4">
                      <h3 className="font-bold">Tech Stack</h3>
                      <p className="mt-2 text-sm leading-6">React Native, Expo, TypeScript, Supabase, PostgreSQL</p>
                    </div>

                    <div className="rounded border border-[#cfc7b8] bg-white p-4">
                      <h3 className="font-bold">Highlights</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6">
                        <li>Location-based meetup discovery</li>
                        <li>User authentication and profiles</li>
                        <li>Meetup creation flow</li>
                        <li>Interactive UX thinking</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href="https://github.com/hyelim-JEON/linkup-v2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded border border-[#9b9b9b] bg-[#efefef] px-3 py-2 text-sm"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </WindowFrame>
            );
          }

          if (windowItem.id === "projects") {
            const frame = getResponsiveFrame("projects");

            return (
              <WindowFrame
                key={windowItem.id}
                id="projects"
                title="Projects"
                defaultPosition={frame.defaultPosition}
                defaultWidth={frame.defaultWidth}
                defaultHeight={frame.defaultHeight}
                zIndex={windowItem.zIndex}
              >
                <ProjectsWindow />
              </WindowFrame>
            );
          }

          if (windowItem.id === "about") {
            const frame = getResponsiveFrame("about");

            return (
              <WindowFrame
                key={windowItem.id}
                id="about"
                title="About Me"
                defaultPosition={frame.defaultPosition}
                defaultWidth={frame.defaultWidth}
                defaultHeight={frame.defaultHeight}
                zIndex={windowItem.zIndex}
              >
                <AboutTerminal />
              </WindowFrame>
            );
          }

          if (windowItem.id === "til") {
            const frame = getResponsiveFrame("til");

            return (
              <WindowFrame
                key={windowItem.id}
                id="til"
                title="TIL Explorer"
                defaultPosition={frame.defaultPosition}
                defaultWidth={frame.defaultWidth}
                defaultHeight={frame.defaultHeight}
                zIndex={windowItem.zIndex}
              >
                <TilWindow posts={tilPosts} />
              </WindowFrame>
            );
          }

          if (windowItem.id === "ai") {
            const frame = getResponsiveFrame("ai");

            return (
              <WindowFrame
                key={windowItem.id}
                id="ai"
                title="Hailey Messenger"
                defaultPosition={frame.defaultPosition}
                defaultWidth={frame.defaultWidth}
                defaultHeight={frame.defaultHeight}
                zIndex={windowItem.zIndex}
              >
                <AIChatWindow />
              </WindowFrame>
            );
          }

          if (windowItem.id === "mail") {
            const frame = getResponsiveFrame("mail");

            return (
              <WindowFrame
                key={windowItem.id}
                id="mail"
                title="Contact Hailey"
                defaultPosition={frame.defaultPosition}
                defaultWidth={frame.defaultWidth}
                defaultHeight={frame.defaultHeight}
                zIndex={windowItem.zIndex}
              >
                <ContactHaileyWindow contactEmail="hyelimiam@gmail.com" />
              </WindowFrame>
            );
          }

          return null;
        })}
    </>
  );
}
