import type { Problem } from "./types";

type ProblemDetailProps = {
  problem: Problem;
};

export default function ProblemDetail({ problem }: ProblemDetailProps) {
  return (
    <section className="border border-[#7f7f7f] bg-[#ffffff] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#808080]">
      <div className="bg-[#000080] px-2 py-1 text-[11px] font-bold text-white shadow-[inset_1px_1px_0_#3a6ea5]">{problem.title} Properties</div>

      <div className="border-b border-[#b7b7b7] bg-[#d4d0c8] px-2 py-1 shadow-[inset_1px_1px_0_#ffffff]">
        <div className="border border-[#9a9a9a] bg-white px-2 py-[2px] text-[11px] text-[#222] shadow-[inset_1px_1px_0_#dfdfdf]">
          Problems\{problem.id}.ts
        </div>
      </div>

      <div className="p-3">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[22px] font-bold leading-6 text-[#111]">{problem.title}</h1>
            <p className="mt-1 text-[13px] leading-5 text-[#444]">{problem.summary}</p>
          </div>
          <div className="w-fit border border-[#808080] bg-[#efefef] px-2 py-1 text-[11px] font-bold text-[#333] shadow-[inset_1px_1px_0_#ffffff]">
            {problem.difficulty}
          </div>
        </div>

        <div className="border border-[#9f9f9f] bg-white shadow-[inset_1px_1px_0_#ffffff] overflow-hidden">
          <div className="hidden sm:grid sm:grid-cols-[68px_minmax(0,1fr)_120px] border-b border-[#808080] bg-[#d4d0c8] text-[11px] font-bold text-[#222] shadow-[inset_1px_1px_0_#ffffff]">
            <div className="border-r border-[#b1b1b1] px-2 py-1">Case</div>
            <div className="border-r border-[#b1b1b1] px-2 py-1">Input</div>
            <div className="px-2 py-1">Expected</div>
          </div>

          <div className="max-h-[180px] overflow-y-auto [scrollbar-color:#c0c0c0_#ffffff] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-track]:bg-[#d4d0c8] [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-[#808080] [&::-webkit-scrollbar-thumb]:bg-[#c0c0c0] [&::-webkit-scrollbar-corner]:bg-[#d4d0c8]">
            {problem.tests.map((test, index) => (
              <div
                key={`${problem.id}-${index}`}
                className="border-b border-[#dfdfdf] text-[11px] text-[#222] last:border-b-0 sm:grid sm:grid-cols-[68px_minmax(0,1fr)_120px] sm:items-center"
              >
                <div className="border-b border-[#efefef] px-2 py-1 font-bold text-[#333] sm:border-b-0 sm:border-r">
                  Case {String(index + 1).padStart(2, "0")}
                </div>
                <div className="border-b border-[#efefef] px-2 py-1 font-mono text-[#555] break-all sm:border-b-0 sm:border-r sm:truncate">
                  {test.input}
                </div>
                <div className="px-2 py-1 font-mono text-[#1f5a2e] break-all sm:truncate">{test.expected}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
