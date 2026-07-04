import { createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "icey_admin_session";
const sessionTtlMs = 1000 * 60 * 60 * 24 * 7;
const fallbackSessionSecret = randomBytes(32).toString("base64url");

type SessionPayload = {
  role: "admin";
  username: string;
  expiresAt: number;
  nonce: string;
};

function getSessionSecret() {
  return process.env.SESSION_SECRET || fallbackSessionSecret;
}

export function getAdminUsername() {
  return process.env.ADMIN_USERNAME || "admin";
}

function hashPassword(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function constantEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyAdminCredentials(username: string, password: string) {
  if (!constantEqual(username, getAdminUsername())) return false;

  const configuredHash = process.env.ADMIN_PASSWORD_HASH;
  if (configuredHash) {
    return constantEqual(hashPassword(password), configuredHash);
  }

  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (configuredPassword) {
    return constantEqual(password, configuredPassword);
  }

  return false;
}

function sign(payload: string) {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

function encodeSession(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decodeSession(value: string | undefined): SessionPayload | null {
  if (!value) return null;

  const [body, signature] = value.split(".");
  if (!body || !signature || !constantEqual(sign(body), signature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (payload.role !== "admin" || payload.expiresAt < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createAdminSession(username: string) {
  const cookieStore = await cookies();
  const value = encodeSession({
    role: "admin",
    username,
    expiresAt: Date.now() + sessionTtlMs,
    nonce: randomBytes(12).toString("base64url"),
  });

  cookieStore.set(cookieName, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionTtlMs / 1000,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return decodeSession(cookieStore.get(cookieName)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
