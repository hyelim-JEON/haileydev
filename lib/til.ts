import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "./markdown";

const postsDirectory = path.join(process.cwd(), "content/til");

export type TilPost = {
  id: string;
  title: string;
  date: string;
  category?: string;
  content: string;
};

export async function getAllTilPosts(): Promise<TilPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const htmlContent = await markdownToHtml(content);

        return {
          id: fileName.replace(/\.md$/, ""),
          title: data.title ?? "Untitled",
          date: data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date ?? ""),
          category: data.category ?? "",
          content: htmlContent,
        };
      }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}
