"use client";

import { ProjectCategory } from "./projectsData";

type ProjectFiltersProps = {
  activeFilter: ProjectCategory;
  onChangeFilter: (filter: ProjectCategory) => void;
};

const filters: { label: string; value: ProjectCategory }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "UX/UI", value: "uxui" },
  { label: "Team", value: "team" },
  { label: "Personal", value: "personal" },
];

export default function ProjectFilters({ activeFilter, onChangeFilter }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-[#d6d6d6] bg-[#f7f7f7] px-4 py-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChangeFilter(filter.value)}
            className={`border px-3 py-1 text-sm transition ${
              isActive ? "border-[#7aa7ff] bg-[#dbe9ff] text-[#1146a6]" : "border-[#d0d0d0] bg-white text-[#333] hover:bg-[#efefef]"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
