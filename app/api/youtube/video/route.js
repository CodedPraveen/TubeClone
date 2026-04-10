import { NextResponse } from "next/server";
import {
  fetchChannel,
  fetchPlaylistItems,
  fetchVideoDetails,
} from "@/lib/youtube-server";

const ID_RE = /^[a-zA-Z0-9_-]{11}$/;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = (searchParams.get("id") || "").trim();
    if (!ID_RE.test(id)) {
      return NextResponse.json({ error: "Invalid video id" }, { status: 400 });
    }

    const videoRes = await fetchVideoDetails(id);
    const video = videoRes?.items?.[0];
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const channelId = video.snippet?.channelId;
    let related = { items: [] };

    if (channelId) {
      const ch = await fetchChannel(channelId);
      const uploadsId = ch?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
      if (uploadsId) {
        const pl = await fetchPlaylistItems(uploadsId, undefined, 16);
        related = {
          items: (pl.items || [])
            .map((it) => {
              const vid =
                it.contentDetails?.videoId ||
                it.snippet?.resourceId?.videoId ||
                null;
              return {
                snippet: it.snippet,
                id: { videoId: vid },
              };
            })
            .filter((it) => it.id?.videoId && it.id.videoId !== id),
        };
      }
    }

    return NextResponse.json({ video, related });
  } catch (e) {
    const msg = e?.message || "Video load failed";
    const status = msg.includes("Missing YOUTUBE_API_KEY") ? 503 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
