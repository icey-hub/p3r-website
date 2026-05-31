"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";

export default function Hero() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const handleIntroEnded = useCallback(() => {
    if (video2Ref.current) {
      video2Ref.current.play().catch(() => {
        // Autoplay may be blocked; silently ignore
      });
    }
  }, []);

  return (
    <section
      className="fv relative w-full overflow-visible"
      style={{ height: "clamp(360px, 61.2vw, 100svh)" }}
    >
      {/* Title Logo */}
      <h1
        className="title-logo absolute z-[100] m-0 overflow-visible"
        style={{
          top: "50%",
          right: "12%",
          transform: "translateY(-50%)",
          width: "clamp(150px, 23.5vw, 420px)",
          height: "auto",
          aspectRatio: "302 / 227",
        }}
      >
        <Image
          src="/images/top/title-logo.svg"
          alt="PERSONA3 RELOAD"
          width={302}
          height={227}
          priority
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </h1>

      {/* Decorative FV Text */}
      <div
        className="fv-text run absolute z-[100] overflow-visible"
        style={{
          top: "clamp(40px, 10vw, 78px)",
          left: "clamp(20px, 4vw, 51px)",
          width: "clamp(130px, 18.7vw, 320px)",
          height: 0,
        }}
      >
        {/* SVG 1: PERSONA3 RELOAD */}
        <svg
          viewBox="0 0 318.02 86.82"
          style={{ display: "block", overflow: "visible", width: "100%", height: "auto" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="0"
            y="60"
            fill="#fff"
            fontFamily="var(--font-syncopate), Syncopate, sans-serif"
            fontWeight="700"
            fontSize="48"
            letterSpacing="0.05em"
          >
            PERSONA3
          </text>
          <text
            x="0"
            y="86"
            fill="#fff"
            fontFamily="var(--font-syncopate), Syncopate, sans-serif"
            fontWeight="700"
            fontSize="48"
            letterSpacing="0.05em"
          >
            RELOAD
          </text>
        </svg>

        {/* SVG 2: NOW ON SALE */}
        <svg
          viewBox="0 0 424.59 99.8"
          style={{ display: "block", marginTop: "-2%", overflow: "visible", width: "130%", height: "auto" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="0"
            y="70"
            fill="#fff"
            fontFamily="var(--font-urbanist), Urbanist, sans-serif"
            fontWeight="300"
            fontSize="32"
            letterSpacing="0.3em"
          >
            NOW ON SALE
          </text>
        </svg>

        {/* Screen-reader text */}
        <span
          className="disp-none absolute overflow-hidden"
          style={{
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            clip: "rect(0,0,0,0)",
            whiteSpace: "nowrap",
            borderWidth: 0,
          }}
        >
          PERSONA3 RELOAD NOW ON SALE
        </span>
      </div>

      {/* Scroll Indicator */}
      <div
        className="scroll-box absolute z-[100] overflow-visible"
        style={{
          bottom: "clamp(30px, 7.6vw, 95px)",
          left: "50%",
          transform: "translateX(-18.5px)",
        }}
      >
        <span
          className="scroll-text"
          style={{
            fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
            fontSize: 10,
            fontWeight: 400,
            lineHeight: "10px",
            color: "#fff",
            letterSpacing: "0.15em",
          }}
        >
          SCROLL
        </span>
      </div>

      {/* Video Container */}
      <div className="fv-movie absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Intro Video (plays once) */}
        <video
          ref={video1Ref}
          id="fv-movie1"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleIntroEnded}
          className="absolute top-0 left-1/2 w-full min-w-full h-full object-cover"
          style={{ transform: "translateX(-50%)" }}
        >
          <source
            src="/images/top/fv_movie1_bef3ec38c6b4ba869207fc85cf95bc78.mp4"
            type="video/mp4"
          />
        </video>

        {/* Loop Video (hidden initially, plays after intro) */}
        <video
          ref={video2Ref}
          id="fv-movie2"
          muted
          playsInline
          loop
          preload="auto"
          className="absolute top-0 left-1/2 w-full min-w-full h-full object-cover opacity-0 transition-opacity duration-300"
          style={{ transform: "translateX(-50%)" }}
          onPlay={() => {
            if (video2Ref.current) {
              video2Ref.current.style.opacity = "1";
            }
            if (video1Ref.current) {
              video1Ref.current.style.opacity = "0";
            }
          }}
        >
          <source
            src="/images/top/fv_movie2_1aaf21a0de60678450744da0dbaf9ef4.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Hologram Overlay */}
      <div className="fv-overlay absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <Image
          className="particle"
          src="/images/top/fv_hologram_623ce43cef503d4df8ac692f74547213.webp"
          alt=""
          width={1282}
          height={785}
          priority
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "inline",
          }}
        />
      </div>
    </section>
  );
}
