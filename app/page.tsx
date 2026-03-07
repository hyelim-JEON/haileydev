import DesktopShell from "@/components/DesktopShell";
import { getAllTilPosts } from "@/lib/til";

export default async function Home() {
  const tilPosts = await getAllTilPosts();

  return <DesktopShell tilPosts={tilPosts} />;
}
