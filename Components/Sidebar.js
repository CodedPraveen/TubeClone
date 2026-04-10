"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

function Row({ href, icon, label, onNavigate }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="flex items-center gap-4 rounded-lg px-3 py-2 text-sm text-white hover:bg-white/10"
    >
      <Image src={icon} alt="" width={22} height={22} className="invert shrink-0" />
      <span className="truncate md:hidden lg:inline">{label}</span>
    </Link>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 md:hidden lg:inline">
        {children}
      </span>
      <span className="hidden text-[10px] font-semibold uppercase tracking-wide text-zinc-500 md:inline lg:hidden">
        {String(children).slice(0, 2)}
      </span>
      <Image
        src="/assets/arrow.svg"
        alt=""
        width={16}
        height={16}
        className=" opacity-70 md:hidden lg:inline"
      />
    </div>
  );
}

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside
      className={`fixed left-0 top-14 z-40 h-[calc(100dvh-3.5rem)] w-[240px] -translate-x-full no-scrollbar border-r border-white/10 bg-[#0f0f0f] pb-8 transition-transform lg:static lg:translate-x-0 md:w-[72px] md:shrink-0 lg:w-[240px] ${
        open ? "translate-x-0" : ""
      }`}
    >
      <nav className="flex flex-col gap-1 p-3">
        <Row
          href="/"
          icon="/assets/home.svg"
          label="Home"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=shorts"
          icon="/assets/shorts.svg"
          label="Shorts"
          onNavigate={onNavigate}
        />
      </nav>

      <div className="mx-3 border-t border-white/10 pt-2">
        <SectionTitle>You</SectionTitle>
        <Row
          href="/search?q=history"
          icon="/assets/you/history.svg"
          label="History"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=playlists"
          icon="/assets/you/playlists.svg"
          label="Playlists"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=watch+later"
          icon="/assets/you/watch_later.svg"
          label="Watch later"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=liked+videos"
          icon="/assets/you/like_btn.svg"
          label="Liked videos"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=downloads"
          icon="/assets/you/download.svg"
          label="Downloads"
          onNavigate={onNavigate}
        />
      </div>

      <div className="mx-3 mt-2 border-t border-white/10 pt-2">
        <SectionTitle>Explore</SectionTitle>
        <Row
          href="/search?q=shopping"
          icon="/assets/explore/shopping.svg"
          label="Shopping"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=music+videos"
          icon="/assets/explore/music.svg"
          label="Music"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=live"
          icon="/assets/explore/live.svg"
          label="Live"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=gaming"
          icon="/assets/explore/gaming.svg"
          label="Gaming"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=news"
          icon="/assets/explore/news.svg"
          label="News"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=sports"
          icon="/assets/explore/sport.svg"
          label="Sports"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=podcasts"
          icon="/assets/explore/podcast.svg"
          label="Podcasts"
          onNavigate={onNavigate}
        />
      </div>

      <div className="mx-3 mt-2 border-t border-white/10 pt-2">
        <SectionTitle>More from YouTube</SectionTitle>
        <Row
          href="/search?q=youtube+premium"
          icon="/assets/explore/yt_prem.svg"
          label="YouTube Premium"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=youtube+music"
          icon="/assets/explore/yt_music.svg"
          label="YouTube Music"
          onNavigate={onNavigate}
        />
        <Row
          href="/search?q=youtube+kids"
          icon="/assets/explore/yt_kids.svg"
          label="YouTube Kids"
          onNavigate={onNavigate}
        />
      </div>

      <div className="mt-4 px-4 text-[11px] leading-relaxed text-zinc-500 md:hidden lg:block">
        <p>Clone UI for learning. Connect your own API key in .env.local.</p>
      </div>
    </aside>
  );
}
