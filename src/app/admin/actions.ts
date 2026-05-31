"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  getAdminUsername,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import { createNote, deleteNote, deletePost, upsertPost } from "@/lib/blog-db";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!verifyAdminCredentials(username, password)) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession(getAdminUsername());
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function savePostAction(formData: FormData) {
  await requireAdmin();
  const post = await upsertPost(formData);

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/posts/${post.slug}`);
  redirect("/admin?saved=1");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await deletePost(id);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?deleted=1");
}

export async function saveNoteAction(formData: FormData) {
  await requireAdmin();
  await createNote(formData);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?noteSaved=1");
}

export async function deleteNoteAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (id) await deleteNote(id);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?noteDeleted=1");
}
