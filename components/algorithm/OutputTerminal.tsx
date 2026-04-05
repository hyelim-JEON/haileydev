type OutputTerminalProps = {
  logs: string[];
};

export default function OutputTerminal({ logs }: OutputTerminalProps) {
  return (
    <section className="overflow-hidden border border-[#7f7f7f] bg-[#1f1f1f] shadow-[inset_1px_1px_0_#3a3a3a,inset_-1px_-1px_0_#000000]">
      <div className="border-b border-[#555] bg-[#d4d0c8] px-2 py-1 text-[11px] font-bold text-[#222] shadow-[inset_1px_1px_0_#ffffff]">Output</div>

      <div className="max-h-[180px] overflow-y-auto bg-[#1f1f1f] p-4 font-mono text-[12px] leading-6 text-[#d4d4d4] [scrollbar-color:#5a5a5a_#1f1f1f] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-[#1f1f1f] [&::-webkit-scrollbar-thumb]:bg-[#5a5a5a]">
        {logs.map((line, index) => (
          <div key={`${line}-${index}`}>{line}</div>
        ))}
      </div>
    </section>
  );
}
