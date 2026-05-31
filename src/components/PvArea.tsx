"use client";

import { useState } from "react";
import { PV_URLS } from "@/lib/assets";

export default function PvArea() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handleClick = () => {
    // Pick a random video from the list
    const urls = [...PV_URLS];
    const randomUrl = urls[Math.floor(Math.random() * urls.length)];
    const videoId = randomUrl.split("v=")[1];
    setActiveVideoId(videoId);
    setIsPlaying(true);
  };

  return (
    <section
      className="w-full h-[clamp(160px,18.7vw,320px)] overflow-hidden relative"
      aria-label="Promotional Videos"
    >
      {/* Background video player container */}
      <div className="pv-player absolute inset-0 z-0">
        {isPlaying && activeVideoId && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        )}
      </div>

      {/* Light blue cover overlay */}
      <div
        className="absolute inset-0 bg-[#DCE9F5] z-20 transition-opacity duration-500"
        style={{ opacity: isPlaying ? 0 : 1, pointerEvents: isPlaying ? "none" : "auto" }}
      />

      {/* PLAY TRAILER headline */}
      <button
        type="button"
        onClick={handleClick}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center gap-3 group cursor-pointer bg-transparent border-none"
      >
        <span
          style={{
            fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.15em",
          }}
        >
          PLAY TRAILER
        </span>
        {/* Arrow SVG */}
        <svg
          width="28"
          height="16"
          viewBox="0 0 28 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M0 8H26M26 8L19 1M26 8L19 15"
            stroke="#fff"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {/* Video thumbnail / hover area (grayscale removal on hover) */}
      {!isPlaying && (
        <div
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick();
          }}
          aria-label="Play trailer video"
        >
          {/* First video as thumbnail background */}
          <video
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500"
          >
            <source src="/images/top/fv_movie1_bef3ec38c6b4ba869207fc85cf95bc78.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </section>
  );
}
