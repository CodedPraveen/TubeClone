"use client";

import React, { useEffect, useState } from "react";
import YouTubePlayer from "@/Components/YouTubePlayer";
import VideoCard from "@/Components/VideoCard";
import { formatPublished, formatViewCount } from "@/lib/format";

export default function WatchView({ videoId }) {
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `/api/youtube/video?id=${encodeURIComponent(videoId)}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load video");
        if (!cancelled) setBundle(data);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Failed to load");
          setBundle(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [videoId]);

  if (loading) {
    return (
      <div className="px-3 py-6">
        <div className="aspect-video max-w-5xl animate-pulse rounded-xl bg-zinc-800" />
        <div className="mt-4 h-8 max-w-2xl animate-pulse rounded bg-zinc-800" />
      </div>
    );
  }

  if (error || !bundle?.video) {
    return (
      <div className="px-3 py-8">
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">
          {error || "Video unavailable"}
        </div>
      </div>
    );
  }

  const v = bundle.video;
  const sn = v.snippet;
  const st = v.statistics;
  const desc = sn?.description || "";
  const related = (bundle.related?.items || [])
    .map((it) => {
      const id = it.id?.videoId;
      if (!id) return null;
      return {
        id,
        snippet: it.snippet,
        statistics: {},
        contentDetails: {},
      };
    })
    .filter(Boolean);

  const downloadHref = `/api/video/download?id=${encodeURIComponent(videoId)}`;

  return (
    <div className="mx-auto max-w-[1800px] px-3 py-4">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <YouTubePlayer videoId={videoId} title={sn?.title} />
          <div className="mt-4">
            <h1 className="text-xl font-bold leading-snug text-white sm:text-2xl">
              {sn?.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <p className="text-sm text-zinc-400">
                {[formatViewCount(st?.viewCount), formatPublished(sn?.publishedAt)]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
              <a
                href={downloadHref}
                download
                className="inline-flex items-center gap-2 rounded-full bg-[#272727] px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 hover:bg-[#3f3f3f]"
              >
                Download video
              </a>
              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-sky-400 hover:underline"
              >
                Open on YouTube
              </a>
            </div>
            <div className="mt-4 rounded-xl bg-[#272727] p-4 text-sm text-zinc-200">
              <p className="font-semibold text-white">{sn?.channelTitle}</p>
              <p className="mt-2 whitespace-pre-wrap text-zinc-300 line-clamp-6 lg:line-clamp-none">
                {desc}
              </p>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Download uses a server stream and may fail for some videos
              (region, age, or format limits). Respect YouTube&apos;s Terms of
              Service and the creator&apos;s rights.
            </p>
          </div>
        </div>

        <aside className="w-full shrink-0 lg:w-[402px]">
          <h2 className="mb-3 text-base font-semibold text-white">
            More from this channel
          </h2>
          <div className="flex flex-col gap-4">
            {related.length === 0 ? (
              <p className="text-sm text-zinc-500">No related items loaded.</p>
            ) : (
              related.map((item) => <VideoCard key={item.id} video={item} compact />)
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
