"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import VideoCard from "@/Components/VideoCard";

function mergeItem(item, detailsMap) {
  const vid = item?.id?.videoId;
  if (!vid) return null;
  const full = detailsMap?.[vid];
  if (full) return full;
  return {
    id: vid,
    snippet: item.snippet,
    statistics: {},
    contentDetails: {},
  };
}

export default function SearchResults() {
  const sp = useSearchParams();
  const q = (sp.get("q") || "").trim();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!q) {
      setVideos([]);
      setError("");
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const u = new URL("/api/youtube/search", window.location.origin);
        u.searchParams.set("q", q);
        u.searchParams.set("maxResults", "24");
        const res = await fetch(u.toString());
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Search failed");
        const map = data.videoDetails || {};
        const list = (data.items || [])
          .map((it) => mergeItem(it, map))
          .filter(Boolean);
        if (!cancelled) setVideos(list);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Search failed");
          setVideos([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [q]);

  if (!q) {
    return (
      <div className="px-3 py-8 text-center text-zinc-400">
        Enter a search in the header to find videos.
      </div>
    );
  }

  return (
    <div className="px-3 py-4">
      <h1 className="mb-4 text-lg font-semibold text-white">
        Results for &quot;{q}&quot;
      </h1>
      {error ? (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video rounded-xl bg-zinc-800" />
              <div className="mt-3 h-4 w-4/5 rounded bg-zinc-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      )}
      {!loading && !error && videos.length === 0 ? (
        <p className="text-zinc-400">No results.</p>
      ) : null}
    </div>
  );
}
