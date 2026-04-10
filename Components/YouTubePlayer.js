"use client";

import React from "react";

export default function YouTubePlayer({ videoId, title }) {
  if (!videoId) return null;
  const src = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&color=white`;

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={src}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
