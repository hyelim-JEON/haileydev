"use client";

import { Project } from "./projectsData";

type ProjectPreviewProps = {
  project: Project | null;
};

export default function ProjectPreview({ project }: ProjectPreviewProps) {
  if (!project) {
    return <div className="flex h-full items-center justify-center p-8 text-[#666]">Select a project to preview.</div>;
  }

  return (
    <section className="h-full overflow-y-auto bg-white p-6 md:p-8">
      <div className="mb-4 text-xs text-[#666]">{`C:\\Users\\Hailey\\Projects\\${project.name}`}</div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#1f1f1f]">{project.name}</h2>
          <p className="mt-2 text-sm text-[#555]">{project.shortDescription}</p>
        </div>

        <div className="overflow-hidden border border-[#d6d6d6] bg-black">
          <div className="flex items-center justify-center py-4">
            {project.image ? (
              <img src={project.image} alt={project.name} className="h-auto max-h-[420px] w-auto object-contain" />
            ) : (
              <span className="text-[#aaa]">Project Preview</span>
            )}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-[#222]">Role</h3>
          <p className="text-sm leading-6 text-[#555]">{project.role}</p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-[#222]">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech: string) => (
              <span key={tech} className="border border-[#d0d0d0] bg-[#f7f7f7] px-3 py-1 text-xs text-[#333]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-[#222]">Key Features</h3>
          <ul className="space-y-2 text-sm text-[#555]">
            {project.features.map((feature: string) => (
              <li key={feature} className="flex gap-2">
                <span className="text-[#2b63c6]">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-[#222]">Why I built it</h3>
          <p className="mb-3 text-sm leading-6 text-[#555]">
            <span className="font-medium text-[#333]">Problem: </span>
            {project.problem}
          </p>
          <p className="text-sm leading-6 text-[#555]">
            <span className="font-medium text-[#333]">Solution: </span>
            {project.solution}
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-[#222]">What I learned</h3>
          <ul className="space-y-2 text-sm text-[#555]">
            {project.learned.map((item: string) => (
              <li key={item} className="flex gap-2">
                <span className="text-[#2f7d4f]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="border border-[#cfcfcf] bg-white px-4 py-2 text-sm font-medium text-[#222] hover:bg-[#f2f2f2]"
            >
              Open GitHub
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="border border-[#7aa7ff] bg-[#dbe9ff] px-4 py-2 text-sm font-medium text-[#1146a6] hover:bg-[#cfe2ff]"
            >
              View Demo
            </a>
          )}

          {project.caseStudy && (
            <a
              href={project.caseStudy}
              target="_blank"
              rel="noreferrer"
              className="border border-[#cfcfcf] bg-white px-4 py-2 text-sm font-medium text-[#222] hover:bg-[#f2f2f2]"
            >
              Case Study
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
