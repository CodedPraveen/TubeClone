import AppShell from "@/Components/AppShell";
import WatchView from "@/Components/WatchView";

export async function generateMetadata({ params }) {
  const { videoId } = await params;
  return {
    title: `Watch ${videoId} · TubeClone`,
  };
}

export default async function WatchPage({ params }) {
  const { videoId } = await params;
  return (
    <AppShell>
      <WatchView videoId={videoId} />
    </AppShell>
  );
}
