import { listPosts } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await listPosts();

  return Response.json({
    posts: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      tag: post.tag,
      date: post.date,
    })),
  });
}
