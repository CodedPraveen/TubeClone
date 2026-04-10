"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TREND_CHIPS } from "@/lib/categories";
import VideoCard from "@/Components/VideoCard";

export default function HomePage() {
  const [categoryId, setCategoryId] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (cat) => {
    setLoading(true);
    setError("");
    try {
      const u = new URL("/api/youtube/trending", window.location.origin);
      u.searchParams.set("region", "US");
      u.searchParams.set("maxResults", "24");
      if (cat) u.searchParams.set("categoryId", cat);
      const res = await fetch(u.toString());
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setVideos(data.items || []);
    } catch (e) {
      setError(e?.message || "Something went wrong");
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(categoryId);
  }, [categoryId, load]);

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <div className="sticky top-14 z-20 border-b border-white/10 bg-[#0f0f0f]/95 backdrop-blur supports-backdrop-filter:bg-[#0f0f0f]/80">
        <div className="flex items-center gap-2 overflow-x-auto px-3 py-3 no-scrollbar">
          {TREND_CHIPS.map((c) => {
            const active =
              (c.id == null && categoryId == null) || c.id === categoryId;
            return (
              <button
                key={c.label}
                type="button"
                onClick={() => setCategoryId(c.id)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white text-black"
                    : "bg-[#272727] text-white hover:bg-[#3f3f3f]"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="px-3 py-4">
        {error ? (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            <p className="font-semibold">Could not load videos</p>
            <p className="mt-1 text-red-200/90">{error}</p>
            <p className="mt-2 text-xs text-zinc-400">
              Add{" "}
              <code className="rounded bg-black/40 px-1">YOUTUBE_API_KEY</code>{" "}
              to{" "}
              <code className="rounded bg-black/40 px-1">.env.local</code> and
              restart the dev server.
            </p>
          </div>
        ) : null}

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video rounded-xl bg-zinc-800" />
                <div className="mt-3 h-4 w-4/5 rounded bg-zinc-800" />
                <div className="mt-2 h-3 w-1/2 rounded bg-zinc-800" />
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
          <p className="text-center text-zinc-400">No videos to show.</p>
        ) : null}
      </div>
    </div>
  );
}
