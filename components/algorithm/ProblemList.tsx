import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import type { Problem } from "./types";

type ProblemListProps = {
  problems: Problem[];
  selectedId: string;
  isCollapsed: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
};

export default function ProblemList({ problems, selectedId, isCollapsed, onToggle, onSelect }: ProblemListProps) {
  return (
    <aside className="border-r border-[#808080] bg-white min-w-0">
      <div className="flex items-center justify-between border-b border-[#b7b7b7] bg-[#d4d0c8] px-2 py-1 text-[11px] font-bold text-[#222] shadow-[inset_1px_1px_0_#ffffff]">
        {!isCollapsed && <span>Problems</span>}
        <button
          onClick={onToggle}
          className="ml-auto flex h-5 w-5 items-center justify-center border border-[#808080] bg-[#d4d0c8] text-[#222] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#808080] active:shadow-[inset_-1px_-1px_0_#ffffff,inset_1px_1px_0_#808080]"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </div>

      <div className="max-h-[700px] overflow-y-auto p-1 [scrollbar-color:#c0c0c0_#ffffff] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-track]:bg-[#d4d0c8] [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-[#808080] [&::-webkit-scrollbar-thumb]:bg-[#c0c0c0] [&::-webkit-scrollbar-corner]:bg-[#d4d0c8]">
        {problems.map((problem) => {
          const active = problem.id === selectedId;

          return (
            <button
              key={problem.id}
              onClick={() => onSelect(problem.id)}
              className={`mb-[2px] flex w-full items-center gap-2 border px-2 py-[6px] text-left text-[12px] leading-4 ${
                active
                  ? "border-[#0a246a] bg-[#0a246a] text-white"
                  : "border-transparent bg-white text-[#222] hover:border-[#808080] hover:bg-[#ece9d8]"
              }`}
              title={problem.title}
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="min-w-0 flex-1 truncate">{problem.title}</span>
                  <span className={`shrink-0 text-[10px] ${active ? "text-[#dfe8ff]" : "text-[#666]"}`}>{problem.difficulty}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
