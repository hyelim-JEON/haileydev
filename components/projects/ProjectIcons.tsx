"use client";

import { Project } from "./projectsData";

type ProjectIconsProps = {
  projects: Project[];
  onOpenExplorer: (project: Project) => void;
  selectedProjectId?: string;
};

export default function ProjectIcons({ projects, onOpenExplorer, selectedProjectId }: ProjectIconsProps) {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 lg:grid-cols-4">
      {projects.map((project: Project) => {
        const isSelected = selectedProjectId === project.id;

        return (
          <button
            key={project.id}
            type="button"
            onDoubleClick={() => onOpenExplorer(project)}
            onClick={() => onOpenExplorer(project)}
            className={`flex min-h-[130px] flex-col items-center justify-center border px-4 py-5 text-center transition ${
              isSelected ? "border-[#7aa7ff] bg-[#dbe9ff]" : "border-transparent bg-white hover:border-[#d6d6d6] hover:bg-[#f5f5f5]"
            }`}
          >
            <div className="mb-3 text-4xl">📁</div>

            <p className="text-sm font-semibold text-[#1f1f1f]">{project.name}</p>

            <p className="mt-1 text-xs text-[#4f4f4f]">{project.tagline}</p>
          </button>
        );
      })}
    </div>
  );
}
