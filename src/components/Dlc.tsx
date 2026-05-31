"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/assets";

export default function Dlc() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="dlc"
      ref={sectionRef}
      className="w-full bg-[#E5EEF6] relative overflow-hidden"
    >
      <div
        className="py-[50px] sm:py-[70px] md:py-[100px] px-[5%]"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        {/* SVG Title "DLC" */}
        <h2 className="mb-8">
          <svg
            viewBox="0 0 120 48"
            width={120}
            height={48}
            xmlns="http://www.w3.org/2000/svg"
            aria-label="DLC"
          >
            <text
              x="0"
              y="38"
              fill="#1d384a"
              fontFamily="var(--font-syncopate), Syncopate, sans-serif"
              fontWeight="700"
              fontSize="42"
              letterSpacing="0.05em"
            >
              DLC
            </text>
          </svg>
        </h2>

        {/* Description */}
        <p
          className="text-[#1d384a] text-base leading-relaxed mb-10 max-w-[640px]"
          style={{
            fontFamily: "var(--font-noto-sans-jp), 'Noto Sans JP', sans-serif",
          }}
        >
          《PERSONA3 RELOAD》提供多款可下載內容，包含服裝、BGM套組、挑戰戰鬥等額外內容，讓你的遊戲體驗更加豐富。
        </p>

        {/* DLC Banner Image */}
        <div className="mb-10">
          <Image
            src={ASSETS.ssDlc}
            alt="DLC banner"
            width={1182}
            height={300}
            className="w-full max-w-[1182px] h-auto"
            priority={false}
          />
        </div>

        {/* CTA Button */}
        <a
          href="/dlc/"
          className="inline-block transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={ASSETS.dlcLinkBtn}
            alt="了解更多"
            width={200}
            height={50}
            priority={false}
          />
        </a>
      </div>
    </section>
  );
}
