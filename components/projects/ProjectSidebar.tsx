"use client";

import { Project } from "./projectsData";

type ProjectSidebarProps = {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
};

export default function ProjectSidebar({ projects, selectedProject, onSelectProject }: ProjectSidebarProps) {
  return (
    <aside className="h-full overflow-y-auto border-r border-[#d6d6d6] bg-[#f8f8f8]">
      <div className="p-2">
        {projects.map((project: Project) => {
          const isSelected = selectedProject?.id === project.id;

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project)}
              className={`mb-1 w-full border px-3 py-2 text-left transition ${
                isSelected
                  ? "border-[#7aa7ff] bg-[#dbe9ff] text-[#1146a6]"
                  : "border-transparent bg-transparent text-[#222] hover:border-[#d8d8d8] hover:bg-[#ececec]"
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-sm">📁</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{project.name}</p>
                  <p className="mt-1 text-xs text-[#666]">{project.tagline}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
