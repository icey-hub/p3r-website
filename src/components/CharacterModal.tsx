"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  character: {
    name: string;
    on: string;
    off: string;
    bg: string;
    modalBg: string;
    profile: string;
    title: string;
  } | null;
}

const WAVE_PATHS = [
  "M0,160 C320,300,420,100,640,200 C880,320,1000,80,1280,160 L1280,320 L0,320 Z",
  "M0,200 C280,80,520,320,760,180 C960,60,1120,280,1280,200 L1280,320 L0,320 Z",
  "M0,240 C360,100,480,300,720,160 C920,40,1080,280,1280,240 L1280,320 L0,320 Z",
];

export default function CharacterModal({ isOpen, onClose, character }: CharacterModalProps) {
  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!character) return null;

  return (
    <div
      className="fixed inset-0 z-[999999999]"
      style={{
        top: isOpen ? "0" : "100svh",
        transition: "top 0.8s ease-in-out",
        pointerEvents: isOpen ? "auto" : "none",
      }}
    >
      {/* Background with wave decoration */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: character.modalBg }}
      >
        {/* SVG wave decorative background */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[40%] opacity-20"
          viewBox="0 0 1280 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {WAVE_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="white"
              style={{
                opacity: 0.3 + i * 0.15,
                transform: `translateY(${-20 * i}px)`,
              }}
            />
          ))}
        </svg>

        {/* Top wave decoration */}
        <svg
          className="absolute top-0 left-0 w-full h-[30%] opacity-10 rotate-180"
          viewBox="0 0 1280 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,96 C213.3,192,426.7,0,640,96 C853.3,192,1066.7,0,1280,96 L1280,320 L0,320 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed right-[clamp(18px,3vw,37px)] top-[clamp(18px,3vw,37px)] z-10 h-[clamp(34px,5vw,48px)] w-[clamp(34px,5vw,48px)] cursor-pointer transition-transform duration-300 hover:scale-110"
        aria-label="Close modal"
      >
        <Image
          src="/images/img/common/modal_close_6eebb1c694aba083fc06c16e60ff4b7e.png"
          alt="Close"
          width={48}
          height={48}
          className="w-full h-full object-contain"
        />
      </button>

      {/* Modal content */}
      <div className="relative w-full h-full flex items-center justify-center overflow-auto">
        <div className="flex w-full max-w-[min(1280px,calc(100vw-32px))] flex-col items-center justify-center gap-6 px-[clamp(16px,4vw,32px)] py-[72px] lg:flex-row lg:gap-16">
          {/* Character image */}
          <div className="relative h-[clamp(320px,58svh,640px)] w-[clamp(240px,43svh,480px)] shrink-0">
            <Image
              src={`/images/img/top/${character.on}`}
              alt={character.name}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 1024px) 360px, 480px"
              priority
            />
          </div>

          {/* Character info */}
          <div className="flex max-w-[min(32rem,100%)] flex-col items-center text-center lg:items-start lg:text-left">
            {/* Character name */}
            <h2 className="text-[clamp(32px,6vw,64px)] font-bold text-[#1D384A] leading-tight tracking-wider uppercase font-[var(--font-syncopate)]">
              {character.name}
            </h2>

            {/* Divider line */}
            <div className="w-[60px] h-[3px] bg-[#1D384A] my-4 lg:my-6 opacity-60" />

            {/* Title / subtitle */}
            <p className="text-[14px] sm:text-[16px] text-[#1D384A] opacity-70 tracking-widest uppercase mb-4">
              {character.title}
            </p>

            {/* Profile description */}
            <p className="text-[14px] sm:text-[15px] leading-[26px] text-[#1D384A] opacity-80">
              {character.profile}
            </p>

            {/* Close hint */}
            <button
              onClick={onClose}
              className="mt-8 px-6 py-2 border border-[#1D384A] border-opacity-30 text-[#1D384A] text-[13px] tracking-wider uppercase transition-all duration-300 hover:bg-[#1D384A] hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
