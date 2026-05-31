"use client";

import { useState } from "react";
import { ArrowUpRight, Feather } from "lucide-react";

const heroCommands = [
  {
    label: "Read",
    value: "Articles",
    href: "#articles",
    title: "Read the latest entries",
    copy: "把最近的想法、设计和工具记录整理成可以继续追踪的文章。",
  },
  {
    label: "Write",
    value: "Admin",
    href: "/admin",
    title: "Open the writing room",
    copy: "进入后台写文章、传图片、管理分类，让博客像一个可操作的系统。",
  },
  {
    label: "Memo",
    value: "Notes",
    href: "#notes",
    title: "Quick notes",
    copy: "短句、灵感、待整理的材料先放进 notes，再慢慢长成文章。",
  },
  {
    label: "Sort",
    value: "Archive",
    href: "#archive",
    title: "Archive rhythm",
    copy: "把不同主题和状态收束起来，保留清晰的阅读路径。",
  },
];

export default function HeroCommandDeck() {
  const [active, setActive] = useState(0);
  const selected = heroCommands[active];

  return (
    <div className="gsap-hero-rail p3r-hero-rail ml-auto w-full max-w-[590px] pt-12 text-white will-change-transform">
      <p className="gsap-hero-kicker mb-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-[#86edfc]">
        <Feather size={16} />
        Personal notes from the dark hour
      </p>

      <div className="p3r-official-panel">
        <div className="gsap-hero-title">
          <p className="font-[var(--font-syncopate)] text-[11px] font-bold uppercase tracking-[0.24em] text-[#86edfc]">
            Reload blog interface
          </p>
          <h1 className="mt-4 text-[clamp(4.5rem,8.4vw,8.6rem)] font-black uppercase leading-[0.78] tracking-[-0.08em] text-white drop-shadow-[0_18px_38px_rgba(0,0,0,.32)]">
            icey
            <span className="block text-[#86edfc]">reload</span>
          </h1>
          <div className="gsap-frequency mt-6 h-[42px] w-full overflow-hidden">
            <div className="flex h-full items-end gap-1">
              {Array.from({ length: 28 }).map((_, index) => (
                <span
                  key={index}
                  className="block w-full bg-[#86edfc]/85 shadow-[0_0_12px_rgba(134,237,252,.58)] will-change-transform"
                  style={{ height: `${18 + ((index * 17) % 24)}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p3r-command-stage gsap-hero-actions">
          <div className="p3r-command-copy gsap-hero-card">
            <p className="font-[var(--font-syncopate)] text-xs font-bold uppercase tracking-[0.24em] text-[#86edfc]">
              Blog command
            </p>
            <p className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-white">
              {selected.title}
            </p>
            <p className="mt-3 text-sm font-semibold leading-7 text-white/74">{selected.copy}</p>
          </div>

          <div className="p3r-official-menu" aria-label="Hero command selector">
            {heroCommands.map((command, index) => (
              <a
                key={command.label}
                href={command.href}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="p3r-menu-row group"
                data-active={index === active}
              >
                <span className="font-[var(--font-syncopate)] text-[10px] font-bold uppercase tracking-[0.22em] text-[#86edfc]">
                  0{index + 1} / {command.label}
                </span>
                <span className="flex items-center justify-between text-[clamp(24px,3vw,34px)] font-black uppercase leading-none tracking-[-0.04em] text-white">
                  {command.value}
                  <ArrowUpRight size={20} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <p className="gsap-hero-copy mt-6 max-w-xl text-[clamp(16px,2vw,20px)] font-semibold leading-8 text-white/82">
          一个借用 P3R 视觉气质的个人博客。写生活、设计、工具、读书和那些只在深夜浮上来的想法。
        </p>
      </div>
    </div>
  );
}
