"use client";
import React, { useState } from "react";

const TagFilter = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const sampleVideos = [
    {
      id: 1,
      title: "Build a Next.js Clone UI",
      channel: "Code Studio",
      views: "124K views",
      time: "2 days ago",
      duration: "12:45",
      tag: "Web Development",
      thumbnail:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "JavaScript Interview Questions",
      channel: "Dev Talks",
      views: "89K views",
      time: "5 days ago",
      duration: "8:02",
      tag: "JavaScript",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Top 10 Gaming Highlights",
      channel: "Game Arena",
      views: "1.1M views",
      time: "1 week ago",
      duration: "4:33",
      tag: "Gaming",
      thumbnail:
        "https://images.unsplash.com/photo-1603481546238-487240415921?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Deploy in Under 5 Minutes",
      channel: "Quick Dev",
      views: "42K views",
      time: "3 days ago",
      duration: "4:58",
      tag: "Under 5 min",
      thumbnail:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "React Components Crash Course",
      channel: "Frontend Hub",
      views: "310K views",
      time: "2 weeks ago",
      duration: "18:21",
      tag: "Web Development",
      thumbnail:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Array Methods You Must Know",
      channel: "JS Daily",
      views: "67K views",
      time: "6 days ago",
      duration: "9:10",
      tag: "JavaScript",
      thumbnail:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 7,
      title: "Live Coding: Build a Portfolio",
      channel: "Code Live",
      views: "53K views",
      time: "1 day ago",
      duration: "1:02:18",
      tag: "Live",
      thumbnail:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 8,
      title: "Lo-fi Coding Mix for Focus",
      channel: "Music Lab",
      views: "240K views",
      time: "4 days ago",
      duration: "34:12",
      tag: "Music",
      thumbnail:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=900&auto=format&fit=crop",
    },
    {
      id: 9,
      title: "Fresh Upload: Tailwind UI Tricks",
      channel: "Frontend Daily",
      views: "18K views",
      time: "3 hours ago",
      duration: "6:21",
      tag: "Recently uploaded",
      thumbnail:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=900&auto=format&fit=crop",
    },
  ];

  const toggleHeader = (tagName) => {
    setSelectedTag(tagName);
  };

  const closeHeader = () => {
    setSelectedTag(null);
  };

  const visibleVideos = selectedTag && selectedTag !== "All"
    ? sampleVideos.filter((video) => video.tag === selectedTag)
    : sampleVideos;

  return (
    <>
      <div className="relative sticky top-0 z-10 bg-white dark:bg-[#000000] py-3 px-4 border-b border-transparent">

        {/* MAIN HEADER */}
        <div
          id="main-header"
          className={`flex items-center transition-opacity duration-200 ${
            selectedTag ? "hidden" : ""
          }`}
        >
          <div className="flex items-center overflow-x-auto no-scrollbar gap-3 whitespace-nowrap pr-10">

            <button
              onClick={() => toggleHeader("All")}
              className="bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-lg text-sm font-medium"
            >
              All
            </button>

            <button
              onClick={() => toggleHeader("Under 5 min")}
              className="tag-btn bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
            >
              {"<5 min"}
            </button>

            <button
              onClick={() => toggleHeader("Web Development")}
              className="tag-btn bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
            >
              Web Development
            </button>

            <button
              onClick={() => toggleHeader("JavaScript")}
              className="tag-btn bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
            >
              JavaScript
            </button>

            <button
              onClick={() => toggleHeader("Live")}
              className="tag-btn bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
            >
              Live
            </button>

            <button
              onClick={() => toggleHeader("Music")}
              className="tag-btn bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
            >
              Music
            </button>

            <button
              onClick={() => toggleHeader("Recently uploaded")}
              className="tag-btn bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
            >
              Recently uploaded
            </button>

            <button
              onClick={() => toggleHeader("Gaming")}
              className="tag-btn bg-gray-100 hover:bg-gray-200 dark:bg-[#272727] dark:hover:bg-[#3f3f3f] dark:text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap"
            >
              Gaming
            </button>
          </div>

          <div className="absolute right-0 top-0 bottom-0 flex items-center bg-gradient-to-l from-white dark:from-[#0f0f0f] via-white dark:via-[#0f0f0f] to-transparent pl-10 pr-4">
            <img
              src="https://www.gstatic.com/images/icons/material/system/2x/chevron_right_grey600_24dp.png"
              alt="more"
              className="w-6 h-6 cursor-pointer dark:invert opacity-70 hover:opacity-100"
            />
          </div>
        </div>

        {/* SECONDARY HEADER */}
        <div
          id="secondary-header"
          className={`absolute inset-0 bg-white dark:bg-[#0f0f0f] items-center px-4 justify-between animate-in fade-in duration-300 ${
            selectedTag ? "flex" : "hidden"
          }`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={closeHeader}
              className="p-2 hover:bg-gray-100 dark:hover:bg-[#272727] rounded-full"
            >
              <img
                src="https://www.gstatic.com/images/icons/material/system/2x/arrow_back_grey600_24dp.png"
                className="w-6 h-6 dark:invert"
                alt="back"
              />
            </button>

            <span className="font-bold text-lg dark:text-white">
              {selectedTag}
            </span>
          </div>

          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold cursor-pointer px-3">
            FILTER BY TOPIC
          </div>
        </div>
      </div>

      <style>
        {`
        .no-scrollbar::-webkit-scrollbar { display:none; }
        .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
        `}
      </style>

      <div className="px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleVideos.map((video) => (
            <div key={video.id} className="cursor-pointer">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-44 object-cover"
                />
                <span className="absolute bottom-2 right-2 text-xs bg-black/80 text-white px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-black dark:text-white line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {video.channel}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {video.views} • {video.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TagFilter;