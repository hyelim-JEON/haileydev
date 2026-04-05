import React, { useMemo, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import ProblemList from "./ProblemList";
import ProblemDetail from "./ProblemDetail";
import OutputTerminal from "./OutputTerminal";
import { algorithmProblems } from "./problems";
import { compareOutputs } from "./utils";
import FakeCodeEditor from "./FakeCodeEditor";

export default function AlgorithmPlaygroundWindow() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedId, setSelectedId] = useState(algorithmProblems[0].id);
  const [logs, setLogs] = useState<string[]>(["> Ready."]);
  const [summary, setSummary] = useState("");

  const selected = useMemo(() => algorithmProblems.find((problem) => problem.id === selectedId) ?? algorithmProblems[0], [selectedId]);

  const runTests = () => {
    const lines = [`> Running ${selected.title}...`, ""];
    let passed = 0;

    selected.tests.forEach((test, index) => {
      try {
        const actual = selected.run(test.input);
        const ok = compareOutputs(actual, test.expected);

        if (ok) passed += 1;

        lines.push(`> Case ${String(index + 1).padStart(2, "0")}: ${ok ? "PASS" : "FAIL"}`);

        if (!ok) {
          lines.push(`  expected: ${test.expected}`);
          lines.push(`  got:      ${actual}`);
        }
      } catch (error) {
        lines.push(`> Case ${String(index + 1).padStart(2, "0")}: FAIL`);
        lines.push(`  error: ${(error as Error).message || "Runtime error"}`);
      }
    });

    lines.push("");
    lines.push(`> ${passed}/${selected.tests.length} tests passed`);

    setLogs(lines);
    setSummary(`${passed}/${selected.tests.length} passed`);
  };

  const resetPanel = () => {
    setLogs(["> Ready."]);
    setSummary("");
  };

  return (
    <div className="h-full w-full bg-[#d4d0c8] p-3">
      <div
        className={`grid h-full min-h-0 overflow-hidden border border-[#808080] bg-[#d4d0c8] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#808080] ${
          isSidebarCollapsed ? "grid-cols-[44px_1fr]" : "grid-cols-1 md:grid-cols-[220px_1fr]"
        }`}
      >
        <ProblemList
          problems={algorithmProblems}
          selectedId={selected.id}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
          onSelect={(id) => {
            const problem = algorithmProblems.find((item) => item.id === id);
            setSelectedId(id);
            setLogs([`> Loaded ${problem?.title ?? id}`]);
            setSummary("");
          }}
        />

        <div className="min-h-0 min-w-0 overflow-y-auto bg-[#d4d0c8] p-3 shadow-[inset_1px_1px_0_#ffffff] [scrollbar-color:#c0c0c0_#ffffff] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-4 [&::-webkit-scrollbar-track]:bg-[#d4d0c8] [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-[#808080] [&::-webkit-scrollbar-thumb]:bg-[#c0c0c0] [&::-webkit-scrollbar-corner]:bg-[#d4d0c8]">
          <div className="space-y-3">
            <ProblemDetail problem={selected} />

            <FakeCodeEditor code={selected.code} fileName="solution.js" />

            <section className="flex flex-wrap items-center gap-2">
              <button
                onClick={runTests}
                className="inline-flex items-center gap-2 border border-[#808080] bg-[#d4d0c8] px-4 py-1.5 text-sm font-semibold text-[#222] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#808080] active:shadow-[inset_-1px_-1px_0_#ffffff,inset_1px_1px_0_#808080]"
              >
                <Play className="h-4 w-4" />
                Run
              </button>
              <button
                onClick={resetPanel}
                className="inline-flex items-center gap-2 border border-[#808080] bg-[#d4d0c8] px-4 py-1.5 text-sm text-[#222] shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#808080] active:shadow-[inset_-1px_-1px_0_#ffffff,inset_1px_1px_0_#808080]"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              {summary && <div className="ml-auto text-sm font-bold text-[#1f3d6d]">{summary}</div>}
            </section>

            <OutputTerminal logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}
