import Image from "next/image";
import Link from "next/link";
import IceyP3RHeader from "@/components/IceyP3RHeader";
import IceyGsapEffects from "@/components/IceyGsapEffects";
import HeroCommandDeck from "@/components/HeroCommandDeck";
import HeroLoopVideo from "@/components/HeroLoopVideo";
import {
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Code2,
  Mail,
  Play,
  Tags,
} from "lucide-react";
import { listNotes, listPosts } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

const characters = [
  {
    name: "focus",
    image: "/images/top/character1_badbd990dcbabe1f25c22de113f772a0.webp",
    color: "#86edfc",
    href: "#articles",
  },
  {
    name: "notes",
    image: "/images/top/character2_35a3dc87ea1a02e2e3d6397d46e1cbf9.webp",
    color: "#fc93ff",
    href: "#notes",
  },
  {
    name: "drafts",
    image: "/images/top/character4_b11ad41cb7a01fef1d40aeb65d002471.webp",
    color: "#d3dada",
    href: "/admin",
  },
  {
    name: "archive",
    image: "/images/top/character8_790cb89b62931cfe93f16d61c746464d.webp",
    color: "#faf6a6",
    href: "#archive",
  },
];

export default async function Home() {
  const posts = await listPosts();
  const notes = await listNotes();

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#1d384a]">
      <div
        className="gsap-scroll-progress fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-[#86edfc] shadow-[0_0_18px_rgba(134,237,252,.95)]"
        style={{ transform: "scaleX(0)" }}
      />
      <div className="gsap-cursor-glow pointer-events-none fixed left-0 top-0 z-[90] hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#86edfc]/25 opacity-0 blur-2xl mix-blend-screen will-change-transform lg:block" />
      <IceyGsapEffects />
      <IceyP3RHeader />

      <main>
        <section className="gsap-hero relative aspect-video min-h-[520px] overflow-hidden bg-[#0f2639]">
          <div className="gsap-scan pointer-events-none absolute inset-0 z-[3] opacity-35 mix-blend-screen" />
          <div
            className="gsap-hero-slice pointer-events-none absolute left-0 top-[18%] z-[4] h-12 w-[38vw] origin-left bg-[#86edfc]/80 blur-[1px]"
            style={{ transform: "scaleX(0)" }}
          />
          <div
            className="gsap-hero-slice pointer-events-none absolute right-0 top-[58%] z-[4] h-8 w-[28vw] origin-right bg-white/65 blur-[1px]"
            style={{ transform: "scaleX(0)" }}
          />
          <HeroLoopVideo
            src="/images/p3re/top/fv_movie1_bef3ec38c6b4ba869207fc85cf95bc78.mp4"
            loopSeconds={4}
            className="gsap-video absolute inset-0 h-full w-full object-contain opacity-100 will-change-transform"
          />
          <Image
            src="/images/top/fv_hologram_623ce43cef503d4df8ac692f74547213.webp"
            alt=""
            fill
            priority
            className="gsap-hologram object-contain opacity-90 mix-blend-screen will-change-transform"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#061326]/34 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-white/70" />

          <div className="relative z-10 grid h-full min-h-[520px] w-full items-center gap-10 px-[clamp(20px,5vw,64px)] pt-24 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative hidden min-h-[520px] lg:block">
              <div className="absolute left-[-10%] top-[14%] h-28 w-[60vw] -skew-x-[24deg] bg-white/90" />
              <div className="absolute left-[3%] top-[29%] h-16 w-[42vw] -skew-x-[24deg] bg-[#86edfc]/85" />
              <div className="absolute bottom-[18%] left-[-6%] h-20 w-[48vw] -skew-x-[24deg] bg-[#061326]/80" />
              <Image
                src="/images/top/title-logo.svg"
                alt="Persona 3 Reload visual reference"
                width={302}
                height={227}
                className="gsap-hero-logo absolute left-[8%] top-[18%] z-[4] w-[min(28vw,330px)] opacity-95 drop-shadow-[0_20px_45px_rgba(0,0,0,.42)] will-change-transform"
              />
              <div className="absolute bottom-[24%] left-[10%] z-[4]">
                <p className="font-[var(--font-syncopate)] text-[13px] font-bold uppercase tracking-[0.26em] text-[#86edfc]">
                  icey blog now on log
                </p>
                <p className="mt-3 max-w-[420px] text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white drop-shadow-[0_14px_32px_rgba(0,0,0,.36)]">
                  Remember, write it down.
                </p>
              </div>
            </div>

            <HeroCommandDeck />

            <div className="relative min-h-[120px] lg:hidden" />
          </div>
          <a
            href="#articles"
            className="p3r-scroll-cue absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 text-white lg:block"
            aria-label="Scroll to articles"
          >
            <span>Scroll</span>
          </a>
        </section>

        <section id="articles" className="relative bg-white py-[clamp(72px,10vw,128px)]">
          <div className="mx-auto w-full max-w-[1282px] px-[clamp(20px,5vw,64px)]">
            <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-[#5ba4d7]">
                  <BookOpenText size={16} />
                  Blog entries
                </p>
                <h2 className="gsap-section-title text-[clamp(48px,7vw,92px)] font-black uppercase leading-none tracking-[-0.06em]">
                  Articles
                </h2>
              </div>
              <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em]">
                Write in admin
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Link
                  href={`/posts/${post.slug}`}
                  key={post.id}
                  className="gsap-post-card p3r-article-card group relative overflow-hidden bg-[#eaf6ff] transition will-change-transform"
                >
                  <div className="gsap-card-glint pointer-events-none absolute inset-0 z-10 bg-linear-to-br from-white/0 via-white/35 to-[#86edfc]/0 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute left-0 top-0 z-20 bg-[#ff425d] px-4 py-2 font-[var(--font-syncopate)] text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                    Entry {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="relative h-[252px] overflow-hidden bg-[#102c42]">
                    <Image src={post.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#102c42]/80 via-transparent to-white/10" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#102c42]">
                        <Tags size={14} />
                        {post.tag}
                      </span>
                      <span className="bg-[#86edfc] px-3 py-2 font-[var(--font-syncopate)] text-[10px] font-bold uppercase tracking-[0.16em] text-[#102c42]">
                        Blog
                      </span>
                    </div>
                  </div>
                  <div className="relative p-6">
                    <div className="absolute -right-8 top-5 h-8 w-36 -skew-x-[22deg] bg-[#86edfc]/70" />
                    <p className="relative font-[var(--font-syncopate)] text-[11px] font-bold uppercase tracking-[0.2em] text-[#147ebb]">{post.date}</p>
                    <h3 className="mt-4 text-2xl font-black leading-tight tracking-[-0.03em]">{post.title}</h3>
                    <p className="mt-4 min-h-[112px] text-sm font-semibold leading-7 text-[#1d384a]/72">{post.excerpt}</p>
                    <div className="mt-6 flex justify-end border-t border-[#1d384a]/20 pt-4">
                      <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" size={22} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="notes" className="gsap-notes-section relative overflow-hidden bg-[#c0d5e8] py-[clamp(72px,10vw,128px)]">
          <div className="gsap-notes-band pointer-events-none absolute left-0 top-1/2 h-28 w-[120vw] -translate-y-1/2 -skew-y-3 bg-white/24 will-change-transform" />
          <div className="mx-auto grid w-full max-w-[1282px] gap-10 px-[clamp(20px,5vw,64px)] lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-white">
                <CalendarDays size={16} />
                Quick notes
              </p>
              <h2 className="gsap-section-title text-[clamp(48px,7vw,92px)] font-black uppercase leading-none tracking-[-0.06em] text-white">
                Notes
              </h2>
              <p className="mt-6 max-w-md text-base font-semibold leading-8 text-[#1d384a]/75">
                像 P3R 的横向角色段落一样，这里放不同状态下的短笔记：focus、notes、drafts、archive。
              </p>
            </div>

            <div className="grid gap-4">
              {notes.map((note, index) => (
                <article key={note.id} className="gsap-note flex gap-5 bg-white/80 p-5 shadow-[10px_10px_0_rgba(29,56,74,.18)] will-change-transform">
                  <span className="text-2xl font-black text-[#5ba4d7]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-lg font-black leading-7">{note.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="modes" className="gsap-modes min-h-screen overflow-hidden bg-[#5ba4d7] py-[clamp(72px,10vw,128px)]">
          <div className="mx-auto w-full max-w-[1282px] px-[clamp(20px,5vw,64px)]">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-white/80">Writing personas</p>
            <h2 className="gsap-section-title text-[clamp(44px,7vw,86px)] font-black uppercase leading-none tracking-[-0.06em] text-white">
              Modes
            </h2>
            <div className="gsap-mode-viewport mt-10 overflow-x-auto pb-6 lg:overflow-hidden">
              <div className="gsap-mode-track flex w-max gap-5 will-change-transform">
                {characters.map((item) => (
                  <Link
                    id={item.name === "notes" ? "notes-mode" : item.name}
                    key={item.name}
                    href={item.href}
                    className="gsap-mode-card relative h-[440px] w-[280px] shrink-0 overflow-hidden will-change-transform lg:h-[520px] lg:w-[380px]"
                    style={{ backgroundColor: item.color }}
                  >
                    <Image src={item.image} alt="" fill className="object-cover object-top" />
                    <div className="absolute bottom-0 left-0 right-0 bg-white/86 p-4 backdrop-blur">
                      <p className="text-2xl font-black uppercase tracking-[-0.03em]">{item.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-white py-[clamp(72px,10vw,128px)]">
          <div
            className="gsap-contact-strike pointer-events-none absolute right-0 top-12 h-16 w-[46vw] origin-right bg-[#86edfc]/50 will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
          <div className="gsap-newsletter mx-auto grid w-full max-w-[1282px] gap-8 px-[clamp(20px,5vw,64px)] md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em] text-[#5ba4d7]">
                <Mail size={16} />
                Newsletter
              </p>
              <h2 className="gsap-section-title text-[clamp(44px,7vw,86px)] font-black uppercase leading-none tracking-[-0.06em]">
                Join the dorm
              </h2>
              <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-[#1d384a]/72">
                新文章、读书片段和幕后想法，会整理到站内数据库。也可以从下面的 GitHub 和 B 站入口找到我。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://github.com/icey-hub"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 bg-[#1d384a] px-5 text-sm font-black uppercase tracking-[0.12em] text-white"
                >
                  <Code2 size={17} />
                  GitHub
                </a>
                <a
                  href="https://www.bilibili.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 bg-[#86edfc] px-5 text-sm font-black uppercase tracking-[0.12em] text-[#1d384a]"
                >
                  <Play size={17} />
                  Bilibili
                </a>
              </div>
            </div>
            <form className="grid gap-3 bg-[#dce9f5] p-4 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-14 min-w-0 bg-white px-5 text-sm font-bold text-[#1d384a] outline-none"
              />
              <button type="button" className="h-14 bg-[#1d384a] px-7 text-sm font-black uppercase tracking-[0.12em] text-white">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#1d384a] py-9 text-white">
        <div className="mx-auto flex w-full max-w-[1282px] flex-col gap-4 px-[clamp(20px,5vw,64px)] text-sm font-bold sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 icey reload blog.</p>
          <div className="flex gap-5 uppercase tracking-[0.16em] text-white/65">
            <a href="https://github.com/icey-hub" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.bilibili.com/" target="_blank" rel="noreferrer">Bilibili</a>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
