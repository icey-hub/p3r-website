"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useModal } from "@/components/Modals";

interface NavItem {
  label: string;
  href: string;
  className?: string;
  modal?: "feature" | "game-system";
}

const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#", className: "feature-modal-open", modal: "feature" },
  { label: "Game System", href: "#", className: "game-system-modal-open", modal: "game-system" },
  { label: "Character", href: "#character" },
  { label: "DLC", href: "/dlc/" },
  { label: "Expansion Pass", href: "/expansion/" },
  { label: "Stores", href: "/stores/" },
];

const LANGUAGES = ["TC", "JA", "EN", "SC", "KO", "FR", "IT", "DE", "ES"] as const;

export default function Header() {
  const { openModal } = useModal();
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<(typeof LANGUAGES)[number]>("TC");
  const [menuOpen, setMenuOpen] = useState(false);
  const langBoxRef = useRef<HTMLDivElement>(null);

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langBoxRef.current && !langBoxRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleLangSelect(lang: (typeof LANGUAGES)[number]) {
    setCurrentLang(lang);
    setLangOpen(false);
  }

  return (
    <header
      className="top absolute top-0 left-0 w-full z-[99] overflow-visible"
      style={{ height: 0 }}
    >
      {/* Desktop Navigation */}
      <div
        className="nav-box hidden lg:flex absolute top-[clamp(22px,3.5vw,45px)] right-[clamp(18px,4vw,64px)] left-[clamp(18px,4vw,64px)] items-center justify-end"
      >
        <ul className="flex min-w-0 flex-row justify-end gap-[clamp(14px,2.5vw,40px)] list-none m-0 p-0">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={item.className}
                onClick={item.modal ? (e) => { e.preventDefault(); openModal(item.modal!); } : undefined}
                style={{
                  display: "block",
                  cursor: "pointer",
                  fontSize: "clamp(12px, 1.25vw, 16px)",
                  lineHeight: "1",
                  fontWeight: 400,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#fff",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* NEWS Badge */}
        <div className="news ml-6 lg:ml-10">
          <Link
            href="#"
            style={{
              display: "block",
              fontSize: 14,
              lineHeight: "14px",
              fontFamily: "var(--font-urbanist), Urbanist, sans-serif",
              fontWeight: 600,
              color: "#fff",
              textDecoration: "none",
              letterSpacing: "0.1em",
            }}
          >
            NEWS
          </Link>
        </div>

        {/* Language Switcher */}
        <div
          ref={langBoxRef}
          className="lang-box relative ml-4"
          style={{
            width: 65,
            height: 44,
            fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
            fontSize: 14,
          }}
        >
          <a
            className="change-lang block cursor-pointer"
            onClick={() => setLangOpen((prev) => !prev)}
            style={{
              width: 65,
              height: 44,
              padding: "15px 10px",
              position: "relative",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: "0.05em",
              boxSizing: "border-box",
              display: "block",
            }}
            role="button"
            aria-expanded={langOpen}
            aria-label="Select language"
          >
            {currentLang}
            <span
              className="lang-arrow absolute top-[19px] right-[10px] w-[9px] h-[6px] block"
            >
              <svg
                width="9"
                height="6"
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L4.5 4.5L8 1"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

          {/* Language List */}
          <ul
            className="lang-list absolute top-[40px] -left-[85px] w-[150px] py-[10px] pr-[30px] list-none m-0 block overflow-hidden"
            style={{
              opacity: langOpen ? 1 : 0,
              transform: langOpen ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              zIndex: langOpen ? 100 : -1,
              transition: "0.4s ease-out",
            }}
          >
            {LANGUAGES.map((lang) => (
              <li
                key={lang}
                className="w-[120px] h-[34px] list-item"
              >
                <a
                  onClick={() => handleLangSelect(lang)}
                  style={{
                    display: "block",
                    padding: "8px 10px",
                    fontSize: 14,
                    lineHeight: "18px",
                    fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
                    fontWeight: lang === currentLang ? 700 : 400,
                    color: lang === currentLang ? "#fff" : "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    cursor: "pointer",
                    letterSpacing: "0.05em",
                    transition: "color 0.2s",
                  }}
                  role="button"
                  aria-current={lang === currentLang ? "true" : undefined}
                >
                  {lang}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Button (hidden on desktop) */}
      <button
        className="menu-btn lg:hidden absolute top-[15px] right-[15px] w-[36px] h-[26px] cursor-pointer z-[110] bg-transparent border-none p-0"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          /* X icon when open */
          <svg width="36" height="26" viewBox="0 0 36 26" fill="none">
            <line x1="4" y1="2" x2="32" y2="24" stroke="#fff" strokeWidth="2" />
            <line x1="32" y1="2" x2="4" y2="24" stroke="#fff" strokeWidth="2" />
          </svg>
        ) : (
          /* Hamburger lines when closed */
          <>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="block w-full h-[2px] bg-white"
                style={{ marginBottom: i < 3 ? 6 : 0 }}
              />
            ))}
          </>
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className="lg:hidden fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: "rgba(29, 56, 74, 0.97)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          visibility: menuOpen ? "visible" : "hidden",
        }}
      >
        <nav className="flex flex-col items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={item.className}
              onClick={(e) => {
                setMenuOpen(false);
                if (item.modal) {
                  e.preventDefault();
                  openModal(item.modal);
                }
              }}
              style={{
                fontSize: 20,
                lineHeight: "28px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#"
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: 20,
              lineHeight: "28px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            NEWS
          </Link>
        </nav>

        {/* Mobile Language Switcher */}
        <div
          className="mt-8"
          style={{
            fontFamily: "var(--font-syncopate), Syncopate, sans-serif",
            fontSize: 14,
          }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLangSelect(lang)}
                className="bg-transparent border-none cursor-pointer px-2 py-1 transition-colors"
                style={{
                  color: lang === currentLang ? "#fff" : "rgba(255,255,255,0.5)",
                  fontWeight: lang === currentLang ? 700 : 400,
                  letterSpacing: "0.05em",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
