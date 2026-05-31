"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Code2, Menu, Play, Settings, X } from "lucide-react";

const navItems = ["Articles", "Notes", "Modes", "Archive", "Contact"];
const archiveItems = [
  { label: "Essays", href: "#articles" },
  { label: "Design logs", href: "#articles" },
  { label: "Reading notes", href: "#notes" },
  { label: "Life archive", href: "#archive" },
  { label: "Draft room", href: "/admin" },
];
const mobileItems = [
  ...navItems.map((item) => ({ label: item, href: `#${item.toLowerCase()}` })),
  { label: "Focus", href: "#focus" },
  { label: "Notes mode", href: "#notes-mode" },
  { label: "Drafts", href: "#drafts" },
  { label: "Archive mode", href: "#archive" },
  { label: "GitHub", href: "https://github.com/icey-hub" },
  { label: "Bilibili", href: "https://www.bilibili.com/" },
  { label: "Admin", href: "/admin" },
];

export default function IceyP3RHeader() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const archiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (archiveRef.current && !archiveRef.current.contains(event.target as Node)) {
        setArchiveOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="mx-auto flex h-[86px] w-full max-w-[1282px] items-center justify-between px-[clamp(18px,4vw,52px)]">
        <Link href="/" className="flex items-center gap-4 text-white" onClick={() => setMobileOpen(false)}>
          <span className="text-[clamp(28px,4vw,52px)] font-black uppercase leading-none tracking-[-0.06em]">
            icey
          </span>
          <span className="hidden border-l border-white/45 pl-4 text-xs font-bold uppercase tracking-[0.28em] sm:block">
            reload blog
          </span>
        </Link>

        <nav className="hidden items-center gap-[clamp(16px,2.5vw,38px)] text-sm font-bold uppercase tracking-[0.05em] text-white lg:flex">
          {navItems.map((item) =>
            item === "Archive" ? (
              <div key={item} ref={archiveRef} className="relative">
                <button
                  type="button"
                  onClick={() => setArchiveOpen((open) => !open)}
                  className="group inline-flex items-center gap-2 bg-transparent text-sm font-bold uppercase tracking-[0.05em] text-white transition hover:text-[#86edfc]"
                  aria-expanded={archiveOpen}
                  aria-haspopup="menu"
                >
                  Archive
                  <ChevronDown
                    size={15}
                    className={`transition duration-300 ${archiveOpen ? "rotate-180 text-[#86edfc]" : ""}`}
                  />
                </button>

                <div
                  className="absolute left-1/2 top-[32px] w-[220px] -translate-x-1/2 overflow-hidden bg-[#1d384a]/95 py-3 shadow-[12px_12px_0_rgba(134,237,252,.35)] backdrop-blur"
                  style={{
                    opacity: archiveOpen ? 1 : 0,
                    transform: archiveOpen
                      ? "translateX(-50%) scaleY(1)"
                      : "translateX(-50%) scaleY(0)",
                    transformOrigin: "top",
                    pointerEvents: archiveOpen ? "auto" : "none",
                    transition: "opacity 0.28s ease-out, transform 0.42s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  role="menu"
                >
                  <div className="absolute left-0 top-0 h-full w-[4px] bg-[#86edfc]" />
                  {archiveItems.map((item, index) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setArchiveOpen(false)}
                      className="group/item relative block px-6 py-3 text-[13px] font-black uppercase tracking-[0.14em] text-white/75 transition hover:bg-white hover:text-[#1d384a]"
                      style={{
                        opacity: archiveOpen ? 1 : 0,
                        transform: archiveOpen ? "translateY(0)" : "translateY(-14px)",
                        transition: `opacity 0.28s ease-out ${index * 45 + 90}ms, transform 0.34s ease-out ${
                          index * 45 + 90
                        }ms, background-color 0.2s ease, color 0.2s ease`,
                      }}
                      role="menuitem"
                    >
                      <span className="absolute left-3 top-1/2 h-px w-0 -translate-y-1/2 bg-[#86edfc] transition-all group-hover/item:w-8" />
                      <span className="relative inline-block transition-transform group-hover/item:translate-x-7">
                        {item.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#86edfc]">
                {item}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/icey-hub"
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#1d384a]"
            aria-label="GitHub"
          >
            <Code2 size={18} />
          </a>
          <a
            href="https://www.bilibili.com/"
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#1d384a]"
            aria-label="Bilibili"
          >
            <Play size={18} />
          </a>
          <a
            href="/admin"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#1d384a]"
            aria-label="Admin"
          >
            <Settings size={18} />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-[#1d384a] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className="fixed inset-0 z-[-1] bg-[#1d384a]/97 text-white lg:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          clipPath: mobileOpen ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          transition: "clip-path 0.48s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",
        }}
      >
        <nav className="flex min-h-svh flex-col justify-center gap-5 px-8 pt-24">
          {mobileItems.map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-white/20 pb-3 text-[clamp(30px,9vw,56px)] font-black uppercase leading-none tracking-[-0.05em]"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(42px)",
                transition: `opacity 0.3s ease ${index * 35 + 120}ms, transform 0.38s ease ${
                  index * 35 + 120
                }ms`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
