"use client";

import { useState } from "react";

type TilPost = {
  id: string;
  title: string;
  date: string;
  category?: string;
  content: string;
};

type Props = {
  posts: TilPost[];
};

export default function TilWindow({ posts }: Props) {
  const [selectedId, setSelectedId] = useState(posts[0]?.id ?? "");
  const selectedPost = posts.find((post) => post.id === selectedId) ?? posts[0];

  if (!posts.length) {
    return <div className="flex h-full items-center justify-center text-sm text-neutral-600">No TIL posts yet.</div>;
  }

  return (
    <div className="grid h-full min-h-0 grid-cols-[220px_1fr] overflow-hidden border border-[#cfc7b8] bg-white">
      <div className="flex min-h-0 flex-col border-r border-[#cfc7b8] bg-[#f4f1e8]">
        <div className="border-b border-[#cfc7b8] bg-[#ece9d8] px-3 py-2 text-sm font-bold">Daily Notes</div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setSelectedId(post.id)}
              className={`block w-full border-b border-[#e2ddd1] px-3 py-2 text-left text-sm hover:bg-[#dbeafe] ${
                selectedPost?.id === post.id ? "bg-[#cfe3ff]" : ""
              }`}
            >
              <div className="font-semibold">{post.title}</div>
              <div className="mt-1 text-xs text-neutral-500">{post.date}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-col">
        <div className="border-b border-[#cfc7b8] bg-[#ece9d8] px-4 py-2">
          <div className="text-lg font-bold">{selectedPost?.title}</div>
          <div className="text-xs text-neutral-600">{selectedPost?.date}</div>
          {selectedPost?.category && <div className="mt-1 text-xs text-blue-700">{selectedPost.category}</div>}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap px-4 py-4 text-sm leading-6 text-neutral-800">
          <div dangerouslySetInnerHTML={{ __html: selectedPost?.content ?? "" }} />
        </div>
      </div>
    </div>
  );
}
