const BASE = "https://www.googleapis.com/youtube/v3";

function getKey() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key?.trim()) {
    throw new Error("Missing YOUTUBE_API_KEY in environment");
  }
  return key.trim();
}

async function ytFetch(path, params) {
  const u = new URL(`${BASE}/${path}`);
  u.searchParams.set("key", getKey());
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") u.searchParams.set(k, String(v));
  }
  const res = await fetch(u.toString(), { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YouTube API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

export async function fetchTrending({ regionCode = "US", categoryId, maxResults = 24 }) {
  return ytFetch("videos", {
    part: "snippet,contentDetails,statistics",
    chart: "mostPopular",
    regionCode,
    videoCategoryId: categoryId || undefined,
    maxResults,
  });
}

export async function fetchSearch({ q, pageToken, maxResults = 24 }) {
  return ytFetch("search", {
    part: "snippet",
    type: "video",
    q,
    maxResults,
    pageToken: pageToken || undefined,
    safeSearch: "moderate",
  });
}

export async function fetchVideoDetails(ids) {
  const idList = Array.isArray(ids) ? ids.join(",") : ids;
  return ytFetch("videos", {
    part: "snippet,contentDetails,statistics",
    id: idList,
  });
}

export async function fetchChannel(channelId) {
  return ytFetch("channels", {
    part: "contentDetails,snippet,statistics",
    id: channelId,
  });
}

export async function fetchPlaylistItems(playlistId, pageToken, maxResults = 15) {
  return ytFetch("playlistItems", {
    part: "snippet,contentDetails",
    playlistId,
    maxResults,
    pageToken: pageToken || undefined,
  });
}

export function mapSearchItemToVideoId(item) {
  return item?.id?.videoId || item?.contentDetails?.videoId || null;
}

export async function enrichVideosByIds(ids) {
  const clean = [...new Set(ids.filter(Boolean))].slice(0, 50);
  if (!clean.length) return {};
  const data = await fetchVideoDetails(clean.join(","));
  const map = {};
  for (const it of data.items || []) {
    map[it.id] = it;
  }
  return map;
}
