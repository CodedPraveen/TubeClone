import { NextResponse } from "next/server";
import {
  enrichVideosByIds,
  fetchSearch,
  mapSearchItemToVideoId,
} from "@/lib/youtube-server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();
    if (!q) {
      return NextResponse.json({ error: "Query required" }, { status: 400 });
    }
    const pageToken = searchParams.get("pageToken") || undefined;
    const maxResults = Math.min(
      50,
      Math.max(1, Number(searchParams.get("maxResults") || 24))
    );
    const data = await fetchSearch({ q, pageToken, maxResults });
    const ids = (data.items || [])
      .map(mapSearchItemToVideoId)
      .filter(Boolean);
    const details = await enrichVideosByIds(ids);
    return NextResponse.json({ ...data, videoDetails: details });
  } catch (e) {
    const msg = e?.message || "Search failed";
    const status = msg.includes("Missing YOUTUBE_API_KEY") ? 503 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
