export type TilPost = {
  id: string;
  date: string;
  title: string;
  content: string;
};

export const tilPosts: TilPost[] = [
  {
    id: "zustand-basics",
    date: "2026-03-07",
    title: "Learned Zustand basics",
    content: "Today I learned how Zustand can manage shared state for windows, focus, and start menu interactions in a React desktop-style UI.",
  },
  {
    id: "react-draggable",
    date: "2026-03-06",
    title: "Using react-draggable",
    content: "I learned how react-draggable can make window components draggable by assigning a handle to the title bar.",
  },
];
