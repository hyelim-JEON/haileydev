"use client";

import { Project } from "./projectsData";
import ProjectPreview from "./ProjectPreview";
import ProjectSidebar from "./ProjectSidebar";

type ProjectExplorerProps = {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
};

export default function ProjectExplorer({ projects, selectedProject, onSelectProject }: ProjectExplorerProps) {
  return (
    <div className="grid h-full min-h-0 grid-cols-1 md:grid-cols-[300px_minmax(0,1fr)]">
      <ProjectSidebar projects={projects} selectedProject={selectedProject} onSelectProject={onSelectProject} />
      <ProjectPreview project={selectedProject} />
    </div>
  );
}
