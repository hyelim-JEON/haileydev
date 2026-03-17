"use client";

import { useMemo, useState } from "react";
import ProjectExplorer from "./ProjectExplorer";
import ProjectFilters from "./ProjectFilters";
import ProjectIcons from "./ProjectIcons";
import { Project, ProjectCategory, projects } from "./projectsData";

type ViewMode = "icons" | "explorer";

export default function ProjectsWindow() {
  const [viewMode, setViewMode] = useState<ViewMode>("icons");
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] ?? null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;

    return projects.filter((project: Project) => project.category.includes(activeFilter));
  }, [activeFilter]);

  const handleChangeFilter = (filter: ProjectCategory) => {
    setActiveFilter(filter);

    const nextProjects = filter === "all" ? projects : projects.filter((project: Project) => project.category.includes(filter));

    setSelectedProject(nextProjects[0] ?? null);
  };

  const handleOpenExplorer = (project: Project) => {
    setSelectedProject(project);
    setViewMode("explorer");
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section className="flex h-full min-h-0 w-full flex-col overflow-hidden border border-[#d6d6d6] bg-[#ffffff] text-[#1f1f1f]">
      {/* top tools / path area */}
      <div className="border-b border-[#d6d6d6] bg-[#f3f3f3] px-4 py-2">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-[#444]">
          <span className="font-medium text-[#666]">Path</span>
          <span className="truncate">{selectedProject ? `C:\\Users\\Hailey\\Projects\\${selectedProject.name}` : "C:\\Users\\Hailey\\Projects"}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode("icons")}
            className={`border px-3 py-1 text-sm ${
              viewMode === "icons" ? "border-[#7aa7ff] bg-[#dbe9ff] text-[#1146a6]" : "border-[#cfcfcf] bg-white text-[#222] hover:bg-[#efefef]"
            }`}
          >
            Icons
          </button>

          <button
            type="button"
            onClick={() => setViewMode("explorer")}
            className={`border px-3 py-1 text-sm ${
              viewMode === "explorer" ? "border-[#7aa7ff] bg-[#dbe9ff] text-[#1146a6]" : "border-[#cfcfcf] bg-white text-[#222] hover:bg-[#efefef]"
            }`}
          >
            Explorer
          </button>
        </div>
      </div>

      <ProjectFilters activeFilter={activeFilter} onChangeFilter={handleChangeFilter} />

      <div className="min-h-0 flex-1 bg-white">
        {viewMode === "icons" ? (
          <div className="h-full overflow-y-auto">
            <ProjectIcons projects={filteredProjects} onOpenExplorer={handleOpenExplorer} selectedProjectId={selectedProject?.id} />
          </div>
        ) : (
          <ProjectExplorer projects={filteredProjects} selectedProject={selectedProject} onSelectProject={handleSelectProject} />
        )}
      </div>
    </section>
  );
}
