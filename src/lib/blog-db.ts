import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeEditorContent } from "./content";

export type PostStatus = "draft" | "published";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  tag: string;
  status: PostStatus;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type QuickNote = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

type BlogDatabase = {
  posts: BlogPost[];
  notes: QuickNote[];
};

const DEFAULT_IMAGES = [
  "/images/top/ss_introduction_ccbbd0e83f473acf4647f51baab6867f.png",
  "/images/top/ss_game_system_810d5104e29a2e47e72286649713efda.jpg",
  "/images/top/ss_features_57a9f52b44e40f3709e529468cefbeb5.png",
];

const seedPosts: BlogPost[] = [
  {
    id: "seed-shadow-time",
    slug: "shadow-time-notes",
    title: "在影时间里整理自己的想法",
    excerpt: "夜晚适合把白天没说完的话捡回来。写作像一次进入隐藏楼层的探索，每一段都是向内推进。",
    content:
      "夜晚适合把白天没说完的话捡回来。写作像一次进入隐藏楼层的探索，每一段都是向内推进。\n\n这里会成为 icey 的长期笔记库：生活、设计、工具、读书，以及那些只在深夜浮上来的想法。",
    image: DEFAULT_IMAGES[0],
    tag: "Essay",
    status: "published",
    date: "2026.05.29",
    createdAt: "2026-05-29T00:00:00.000Z",
    updatedAt: "2026-05-29T00:00:00.000Z",
  },
  {
    id: "seed-writing-system",
    slug: "writing-battle-system",
    title: "给博客做一个可重复的战斗系统",
    excerpt: "选题、草稿、发布、复盘。把写作流程做成稳定系统，灵感来的时候就能直接开战。",
    content:
      "选题、草稿、发布、复盘。把写作流程做成稳定系统，灵感来的时候就能直接开战。\n\n一个能持续写下去的博客，不只需要好看的页面，也需要能快速发布、修改和归档的后台。",
    image: DEFAULT_IMAGES[1],
    tag: "System",
    status: "published",
    date: "2026.05.21",
    createdAt: "2026-05-21T00:00:00.000Z",
    updatedAt: "2026-05-21T00:00:00.000Z",
  },
  {
    id: "seed-blue-space",
    slug: "blue-space-and-rhythm",
    title: "界面里的蓝色、留白和节奏",
    excerpt: "P3R 的视觉很会用冷色制造速度感。博客也可以有类似的清爽、锋利和呼吸。",
    content:
      "P3R 的视觉很会用冷色制造速度感。博客也可以有类似的清爽、锋利和呼吸。\n\n这套博客会继续沿用冷蓝、白色大块、锐利标题和滚动动效，让写作后台也带一点游戏 UI 的速度。",
    image: DEFAULT_IMAGES[2],
    tag: "Design",
    status: "published",
    date: "2026.05.12",
    createdAt: "2026-05-12T00:00:00.000Z",
    updatedAt: "2026-05-12T00:00:00.000Z",
  },
];

const seedNotes: QuickNote[] = [
  {
    id: "seed-note-1",
    text: "今天的草稿标题：把情绪归档，而不是把它丢掉。",
    createdAt: "2026-05-29T00:00:00.000Z",
    updatedAt: "2026-05-29T00:00:00.000Z",
  },
  {
    id: "seed-note-2",
    text: "想写一个关于桌面、游戏 UI 和个人知识库的系列。",
    createdAt: "2026-05-29T00:00:00.000Z",
    updatedAt: "2026-05-29T00:00:00.000Z",
  },
  {
    id: "seed-note-3",
    text: "冷色背景里最重要的是白色的节奏，它负责让文字站稳。",
    createdAt: "2026-05-29T00:00:00.000Z",
    updatedAt: "2026-05-29T00:00:00.000Z",
  },
  {
    id: "seed-note-4",
    text: "写博客像爬塔：不是一次通关，是每天推进一点。",
    createdAt: "2026-05-29T00:00:00.000Z",
    updatedAt: "2026-05-29T00:00:00.000Z",
  },
];

const seedCoverMap = new Map([
  ["seed-shadow-time", DEFAULT_IMAGES[0]],
  ["seed-writing-system", DEFAULT_IMAGES[1]],
  ["seed-blue-space", DEFAULT_IMAGES[2]],
]);

const dataDirectory = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), ".data");
const databasePath = path.join(dataDirectory, "blog.json");

let writeQueue: Promise<unknown> = Promise.resolve();

function emptyDatabase(): BlogDatabase {
  return { posts: seedPosts, notes: seedNotes };
}

function toSlug(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/gi, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `post-${Date.now()}`;
}

function normalizeDate(value: string | undefined) {
  const trimmed = value?.trim();
  if (trimmed) return trimmed;

  const now = new Date();
  return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(
    now.getDate()
  ).padStart(2, "0")}`;
}

function normalizePost(post: BlogPost): BlogPost {
  const seededCover = seedCoverMap.get(post.id);

  if (!seededCover) return post;
  if (post.image === seededCover) return post;

  const isLegacySeedCover =
    post.image.startsWith("/images/top/") ||
    post.image.startsWith("/images/img/top/") ||
    post.image.startsWith("/images/blog-covers/cover-") ||
    post.image.startsWith("/images/blog-covers/p3r-cover-") ||
    post.image.startsWith("/images/blog-covers/p3r-blog-cover-");

  return isLegacySeedCover ? { ...post, image: seededCover } : post;
}

async function ensureDatabase() {
  await mkdir(dataDirectory, { recursive: true });

  try {
    await readFile(databasePath, "utf8");
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code !== "ENOENT") throw error;
    await writeFile(databasePath, `${JSON.stringify(emptyDatabase(), null, 2)}\n`, "utf8");
  }
}

async function readDatabase(): Promise<BlogDatabase> {
  await ensureDatabase();
  const raw = await readFile(databasePath, "utf8");
  const parsed = JSON.parse(raw) as BlogDatabase;

  return {
    posts: Array.isArray(parsed.posts) ? parsed.posts.map(normalizePost) : [],
    notes: Array.isArray(parsed.notes) ? parsed.notes : seedNotes,
  };
}

async function writeDatabase(database: BlogDatabase) {
  await mkdir(dataDirectory, { recursive: true });
  const temporaryPath = `${databasePath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(database, null, 2)}\n`, "utf8");
  await rename(temporaryPath, databasePath);
}

function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    return byDate || b.updatedAt.localeCompare(a.updatedAt);
  });
}

export async function listPosts(options: { includeDrafts?: boolean } = {}) {
  const database = await readDatabase();
  const posts = options.includeDrafts
    ? database.posts
    : database.posts.filter((post) => post.status === "published");

  return sortPosts(posts);
}

export async function listNotes() {
  const database = await readDatabase();
  return [...database.notes].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function getPostBySlug(slug: string, options: { includeDrafts?: boolean } = {}) {
  const database = await readDatabase();
  return database.posts.find(
    (post) => post.slug === slug && (options.includeDrafts || post.status === "published")
  );
}

export async function upsertPost(formData: FormData) {
  const id = String(formData.get("id") || "").trim();
  const now = new Date().toISOString();

  const result = writeQueue.then(async () => {
    const database = await readDatabase();
    const current = id ? database.posts.find((post) => post.id === id) : undefined;
    const title = String(formData.get("title") || "").trim();

    if (!title) {
      throw new Error("Title is required");
    }

    const wantedSlug = toSlug(String(formData.get("slug") || title));
    const existingSlugs = new Set(
      database.posts.filter((post) => post.id !== id).map((post) => post.slug)
    );
    let slug = wantedSlug;
    let suffix = 2;
    while (existingSlugs.has(slug)) {
      slug = `${wantedSlug}-${suffix}`;
      suffix += 1;
    }

    const post: BlogPost = {
      id: current?.id ?? `post-${Date.now()}`,
      slug,
      title,
      excerpt: String(formData.get("excerpt") || "").trim(),
      content: normalizeEditorContent(String(formData.get("content") || "")),
      image: String(formData.get("image") || "").trim() || DEFAULT_IMAGES[0],
      tag: String(formData.get("tag") || "Essay").trim() || "Essay",
      status: String(formData.get("status") || "draft") === "published" ? "published" : "draft",
      date: normalizeDate(String(formData.get("date") || "")),
      createdAt: current?.createdAt ?? now,
      updatedAt: now,
    };

    const nextPosts = current
      ? database.posts.map((item) => (item.id === current.id ? post : item))
      : [post, ...database.posts];

    await writeDatabase({ ...database, posts: nextPosts });
    return post;
  });

  writeQueue = result.catch(() => {});
  return result;
}

export async function deletePost(id: string) {
  const result = writeQueue.then(async () => {
    const database = await readDatabase();
    await writeDatabase({ ...database, posts: database.posts.filter((post) => post.id !== id) });
  });

  writeQueue = result.catch(() => {});
  return result;
}

export async function createNote(formData: FormData) {
  const text = String(formData.get("text") || "").trim();
  if (!text) throw new Error("Note text is required");

  const result = writeQueue.then(async () => {
    const database = await readDatabase();
    const now = new Date().toISOString();
    const note: QuickNote = {
      id: `note-${Date.now()}`,
      text,
      createdAt: now,
      updatedAt: now,
    };

    await writeDatabase({ ...database, notes: [...database.notes, note] });
    return note;
  });

  writeQueue = result.catch(() => {});
  return result;
}

export async function deleteNote(id: string) {
  const result = writeQueue.then(async () => {
    const database = await readDatabase();
    await writeDatabase({ ...database, notes: database.notes.filter((note) => note.id !== id) });
  });

  writeQueue = result.catch(() => {});
  return result;
}
