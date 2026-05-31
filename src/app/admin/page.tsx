import Link from "next/link";
import { deleteNoteAction, deletePostAction, logoutAction, saveNoteAction, savePostAction } from "./actions";
import { requireAdmin } from "@/lib/admin-auth";
import { listNotes, listPosts } from "@/lib/blog-db";
import { normalizeEditorContent } from "@/lib/content";
import RichPostEditor from "@/components/RichPostEditor";

export const dynamic = "force-dynamic";

const defaultImage = "/images/top/ss_introduction_ccbbd0e83f473acf4647f51baab6867f.png";
const postTypes = ["Essay", "System", "Design", "Notes", "Life", "Tech", "Review", "Archive"];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string; noteSaved?: string; noteDeleted?: string }>;
}) {
  const session = await requireAdmin();
  const posts = await listPosts({ includeDrafts: true });
  const notes = await listNotes();
  const params = await searchParams;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef6fb] text-[#1d384a]">
      <header className="bg-[#102c42] text-white">
        <div className="mx-auto flex w-full max-w-[1282px] flex-col gap-5 px-[clamp(20px,5vw,64px)] py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#86edfc]">icey control panel</p>
            <h1 className="mt-2 text-[clamp(40px,7vw,84px)] font-black uppercase leading-none tracking-[-0.06em]">
              Dashboard
            </h1>
            <p className="mt-3 text-sm font-bold text-white/65">Logged in as {session.username}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="inline-flex h-12 items-center bg-white px-5 text-sm font-black uppercase tracking-[0.12em] text-[#1d384a]">
              View site
            </Link>
            <form action={logoutAction}>
              <button className="h-12 border border-white/45 px-5 text-sm font-black uppercase tracking-[0.12em] text-white" type="submit">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1282px] gap-8 px-[clamp(20px,5vw,64px)] py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="bg-white p-5 shadow-[12px_12px_0_rgba(91,164,215,.2)]">
          <div className="mb-5 border-b border-[#1d384a]/15 pb-4">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5ba4d7]">new entry</p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">Write blog</h2>
          </div>

          {params.saved ? <p className="mb-4 bg-[#dcfce7] px-4 py-3 text-sm font-bold text-[#166534]">文章已保存。</p> : null}
          {params.deleted ? <p className="mb-4 bg-[#dbeafe] px-4 py-3 text-sm font-bold text-[#1d4ed8]">文章已删除。</p> : null}
          {params.noteSaved ? <p className="mb-4 bg-[#dcfce7] px-4 py-3 text-sm font-bold text-[#166534]">Note 已保存。</p> : null}
          {params.noteDeleted ? <p className="mb-4 bg-[#dbeafe] px-4 py-3 text-sm font-bold text-[#1d4ed8]">Note 已删除。</p> : null}

          <PostForm />

          <section className="mt-8 border-t border-[#1d384a]/15 pt-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5ba4d7]">quick notes</p>
            <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">Notes manager</h2>
            <form action={saveNoteAction} className="mt-4 grid gap-3">
              <textarea
                name="text"
                placeholder="写一条主页 Notes..."
                className="min-h-24 resize-y border border-[#1d384a]/15 px-4 py-3 text-sm font-semibold leading-7 outline-none focus:border-[#5ba4d7]"
                required
              />
              <button className="h-11 bg-[#1d384a] px-5 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#5ba4d7]" type="submit">
                Add note
              </button>
            </form>
            <div className="mt-5 grid gap-3">
              {notes.map((note, index) => (
                <article key={note.id} className="flex items-start gap-3 bg-[#eef6fb] p-4">
                  <span className="text-xl font-black text-[#5ba4d7]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="min-w-0 flex-1 text-sm font-bold leading-6 text-[#1d384a]/75">{note.text}</p>
                  <form action={deleteNoteAction}>
                    <input type="hidden" name="id" value={note.id} />
                    <button className="h-9 bg-[#fee2e2] px-3 text-xs font-black uppercase tracking-[0.12em] text-[#991b1b]" type="submit">
                      Delete
                    </button>
                  </form>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#5ba4d7]">database</p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em]">Posts</h2>
            </div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1d384a]/45">{posts.length} records</p>
          </div>

          {posts.map((post) => (
            <article key={post.id} className="bg-white p-5 shadow-[10px_10px_0_rgba(29,56,74,.12)]">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#1d384a] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-white">{post.tag}</span>
                    <span className={`px-3 py-1 text-xs font-black uppercase tracking-[0.16em] ${post.status === "published" ? "bg-[#86edfc] text-[#1d384a]" : "bg-[#e5e7eb] text-[#4b5563]"}`}>
                      {post.status}
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-[#5ba4d7]">{post.date}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-[#1d384a]/68">{post.excerpt}</p>
                  <Link href={`/posts/${post.slug}`} className="mt-3 inline-block text-sm font-black uppercase tracking-[0.14em] text-[#5ba4d7]">
                    Open /posts/{post.slug}
                  </Link>
                </div>
                <form action={deletePostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <button className="h-10 bg-[#fee2e2] px-4 text-xs font-black uppercase tracking-[0.12em] text-[#991b1b]" type="submit">
                    Delete
                  </button>
                </form>
              </div>

              <details className="mt-4 border-t border-[#1d384a]/10 pt-4">
                <summary className="cursor-pointer text-sm font-black uppercase tracking-[0.14em] text-[#1d384a]/65">
                  Edit
                </summary>
                <div className="mt-4">
                  <PostForm post={post} />
                </div>
              </details>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function PostForm({
  post,
}: {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    tag: string;
    status: string;
    date: string;
  };
}) {
  const typeOptions = post?.tag && !postTypes.includes(post.tag) ? [post.tag, ...postTypes] : postTypes;

  return (
    <form action={savePostAction} className="grid gap-4">
      <input type="hidden" name="id" value={post?.id ?? ""} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={post?.title} required />
        <Field label="Slug" name="slug" defaultValue={post?.slug} placeholder="auto-from-title" />
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#1d384a]/55">Type</span>
          <select
            name="tag"
            defaultValue={post?.tag ?? "Essay"}
            className="h-12 border border-[#1d384a]/15 px-4 text-sm font-bold outline-none focus:border-[#5ba4d7]"
          >
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <Field label="Date" name="date" defaultValue={post?.date} placeholder="2026.05.29" />
      </div>

      <Field label="Cover image" name="image" defaultValue={post?.image ?? defaultImage} />

      <label className="grid gap-2">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#1d384a]/55">Excerpt</span>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt}
          className="min-h-24 resize-y border border-[#1d384a]/15 px-4 py-3 text-sm font-semibold leading-7 outline-none focus:border-[#5ba4d7]"
          required
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-[#1d384a]/55">Content</span>
        <RichPostEditor name="content" defaultValue={normalizeEditorContent(post?.content ?? "")} />
      </label>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#1d384a]/55">Status</span>
          <select
            name="status"
            defaultValue={post?.status ?? "published"}
            className="h-12 border border-[#1d384a]/15 px-4 text-sm font-bold outline-none focus:border-[#5ba4d7]"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </label>

        <button className="h-12 bg-[#1d384a] px-6 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#5ba4d7]" type="submit">
          {post ? "Update" : "Publish"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[#1d384a]/55">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="h-12 border border-[#1d384a]/15 px-4 text-sm font-bold outline-none focus:border-[#5ba4d7]"
      />
    </label>
  );
}
