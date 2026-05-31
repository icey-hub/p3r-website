"use client";

import type { SyntheticEvent } from "react";
import { useRef } from "react";

type HeroLoopVideoProps = {
  src: string;
  className?: string;
  loopSeconds?: number;
};

export default function HeroLoopVideo({ src, className, loopSeconds = 4 }: HeroLoopVideoProps) {
  const loopStartRef = useRef<number | null>(null);

  function handleLoadedMetadata(event: SyntheticEvent<HTMLVideoElement>) {
    const video = event.currentTarget;
    loopStartRef.current = Math.max(0, video.duration - loopSeconds);
  }

  function handleTimeUpdate(event: SyntheticEvent<HTMLVideoElement>) {
    const video = event.currentTarget;
    const loopStart = loopStartRef.current;

    if (loopStart === null || !Number.isFinite(video.duration)) return;
    if (video.currentTime < video.duration - 0.08) return;

    video.currentTime = loopStart;
    void video.play();
  }

  return (
    <video
      className={className}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={handleLoadedMetadata}
      onTimeUpdate={handleTimeUpdate}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
