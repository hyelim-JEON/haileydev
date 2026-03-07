"use client";

type Props = {
  emoji: string;
  label: string;
  onOpen: () => void;
};

export default function DesktopIcon({ emoji, label, onOpen }: Props) {
  return (
    <button
      type="button"
      onDoubleClick={onOpen}
      className="flex w-24 flex-col items-center rounded px-1 py-2 text-center select-none hover:bg-white/10"
    >
      <div className="flex h-12 w-12 items-center justify-center text-4xl">{emoji}</div>
      <span className="mt-1 text-xs leading-4 text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.9)]">{label}</span>
    </button>
  );
}
