"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Navbar({ onMenuClick }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/10 bg-[#0f0f0f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f0f0f]/90">
      <div className="mx-auto flex h-full max-w-[100vw] items-center gap-2 px-2 sm:px-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-full p-2 hover:bg-white/10 md:hidden"
          aria-label="Menu"
        >
          <Image
            src="/assets/line.svg"
            alt=""
            width={24}
            height={24}
            className="invert"
          />
        </button>

        <Link
          href="/"
          className="flex shrink-0 items-center gap-1 rounded-md px-1 py-1 hover:bg-white/5"
        >
          <Image
            src="/assets/yt-logo.svg"
            alt="YouTube"
            width={90}
            height={20}
            className="h-5 w-auto"
            priority
          />
        </Link>

        <form
          onSubmit={onSubmit}
          className="mx-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:max-w-2xl sm:justify-center"
        >
          <div className="flex min-w-0 flex-1 items-center rounded-full border border-[#303030] bg-[#121212] focus-within:border-sky-600">
            <label className="sr-only" htmlFor="yt-search">
              Search
            </label>
            <input
              id="yt-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="h-9 min-w-0 flex-1 rounded-l-full bg-transparent px-4 text-sm text-white placeholder:text-zinc-500 outline-none"
            />
            <button
              type="submit"
              className="flex h-9 w-12 items-center justify-center rounded-r-full bg-[#222222] hover:bg-[#303030]"
              aria-label="Search"
            >
              <Image
                src="/assets/search.svg"
                alt=""
                width={20}
                height={20}
                className="invert opacity-90"
              />
            </button>
          </div>
          <button
            type="button"
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#181818] hover:bg-[#272727] sm:flex"
            aria-label="Voice search"
          >
            <Image
              src="/assets/voice-search.svg"
              alt=""
              width={20}
              height={20}
              className="invert"
            />
          </button>
        </form>

        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm hover:bg-white/10"
          >
            <Image
              src="/assets/plus.svg"
              alt=""
              width={20}
              height={20}
              className="invert"
            />
            <span className="hidden lg:inline">Create</span>
          </button>
          <button
            type="button"
            className="rounded-full p-2 hover:bg-white/10"
            aria-label="Notifications"
          >
            <Image
              src="/assets/bell_icon.svg"
              alt=""
              width={22}
              height={22}
              className="invert"
            />
          </button>
          <button
            type="button"
            className="ml-1 rounded-full p-0.5 hover:ring-2 hover:ring-sky-500"
            aria-label="Account"
          >
            <Image
              src="/assets/profile.svg"
              alt=""
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
