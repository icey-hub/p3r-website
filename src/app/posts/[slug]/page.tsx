import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2, Play } from "lucide-react";
import { getPostBySlug } from "@/lib/blog-db";
import { normalizeEditorContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white text-[#1d384a]">
      <section className="relative overflow-hidden bg-[#102c42] text-white">
        <Image src={post.image} alt="" fill priority className="object-cover opacity-35 mix-blend-screen" />
        <div className="absolute inset-0 bg-linear-to-t from-[#102c42] via-[#102c42]/78 to-[#102c42]/35" />
        <div className="relative mx-auto w-full max-w-[1080px] px-[clamp(20px,6vw,72px)] pb-20 pt-28">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-[#86edfc]">
            <ArrowLeft size={16} />
            Back home
          </Link>
          <p className="mt-12 text-xs font-black uppercase tracking-[0.28em] text-[#86edfc]">
            {post.tag} / {post.date}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(44px,8vw,92px)] font-black leading-[0.95] tracking-[-0.06em]">
            {post.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-white/75">{post.excerpt}</p>
        </div>
      </section>

      <article className="mx-auto w-full max-w-[820px] px-[clamp(20px,6vw,56px)] py-16">
        <div
          className="blog-content text-lg font-semibold leading-9 text-[#1d384a]/78"
          dangerouslySetInnerHTML={{ __html: normalizeEditorContent(post.content) }}
        />

        <div className="mt-14 flex flex-wrap gap-3 border-t border-[#1d384a]/15 pt-8">
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
      </article>
    </main>
  );
}
