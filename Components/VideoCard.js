"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatDuration, formatPublished, formatViewCount } from "@/lib/format";

export default function VideoCard({ video, compact }) {
  const id = video?.id;
  const sn = video?.snippet;
  const st = video?.statistics;
  const cd = video?.contentDetails;
  if (!id || !sn) return null;

  const thumb =
    sn.thumbnails?.high?.url ||
    sn.thumbnails?.medium?.url ||
    sn.thumbnails?.default?.url;
  const duration = formatDuration(cd?.duration);
  const views = formatViewCount(st?.viewCount);
  const when = formatPublished(sn.publishedAt);

  return (
    <Link
      href={`/watch/${id}`}
      className={`group block gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
        compact ? "" : ""
      }`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-zinc-900 ${
          compact ? "aspect-video" : "aspect-video"
        }`}
      >
        {thumb ? (
          <Image
            src={thumb}
            alt={sn.title || ""}
            fill
            sizes={
              compact
                ? "(max-width: 768px) 100vw, 400px"
                : "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            }
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : null}
        {duration ? (
          <span className="absolute bottom-2 right-2 rounded bg-black/85 px-1.5 py-0.5 text-xs font-medium text-white">
            {duration}
          </span>
        ) : null}
      </div>
      <div className={compact ? "mt-2 pr-1" : "mt-3"}>
        <h3
          className={`line-clamp-2 font-semibold text-white group ${
            compact ? "text-sm leading-snug" : "text-base"
          }`}
        >
          {sn.title}
        </h3>
        <p
          className={`mt-1 text-zinc-400 ${compact ? "text-xs" : "text-sm"}`}
        >
          {sn.channelTitle}
        </p>
        <p className={`text-zinc-500 ${compact ? "text-xs" : "text-sm"}`}>
          {[views, when].filter(Boolean).join(" • ")}
        </p>
      </div>
    </Link>
  );
}
