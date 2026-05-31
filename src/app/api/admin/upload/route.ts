import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { getAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return Response.json({ error: "No image file" }, { status: 400 });
  }

  const extension = allowedTypes.get(file.type);
  if (!extension) {
    return Response.json({ error: "Unsupported image type" }, { status: 415 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "Image is larger than 5MB" }, { status: 413 });
  }

  const uploadDirectory = process.env.UPLOAD_DIR
    ? path.resolve(process.env.UPLOAD_DIR)
    : path.join(process.cwd(), "public", "uploads");
  const publicPrefix = process.env.UPLOAD_PUBLIC_PATH || "/uploads";
  const fileName = `${Date.now()}-${randomBytes(6).toString("hex")}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(path.join(uploadDirectory, fileName), bytes);

  return Response.json({ url: `${publicPrefix.replace(/\/$/, "")}/${fileName}` });
}
