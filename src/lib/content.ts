const allowedTags = new Set([
  "a",
  "b",
  "blockquote",
  "br",
  "em",
  "figcaption",
  "figure",
  "h2",
  "h3",
  "i",
  "img",
  "li",
  "ol",
  "p",
  "strong",
  "u",
  "ul",
]);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getAttribute(attributes: string, name: string) {
  const match = attributes.match(new RegExp(`${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, "i"));
  if (!match) return "";
  return match[1].replace(/^['"]|['"]$/g, "").trim();
}

function safeUrl(value: string) {
  if (!value) return "";
  if (value.startsWith("/") || value.startsWith("#")) return value;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? value : "";
  } catch {
    return "";
  }
}

function sanitizeTag(tagName: string, attributes: string, closing: boolean) {
  const tag = tagName.toLowerCase();
  if (!allowedTags.has(tag)) return "";
  if (closing) return tag === "img" || tag === "br" ? "" : `</${tag}>`;
  if (tag === "br") return "<br>";

  if (tag === "a") {
    const href = safeUrl(getAttribute(attributes, "href"));
    return href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noreferrer">` : "<a>";
  }

  if (tag === "img") {
    const src = safeUrl(getAttribute(attributes, "src"));
    const alt = getAttribute(attributes, "alt");
    return src ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">` : "";
  }

  return `<${tag}>`;
}

export function isRichText(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function plainTextToHtml(value: string) {
  const paragraphs = value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return paragraphs.length
    ? paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`).join("")
    : "<p></p>";
}

export function sanitizeRichText(value: string) {
  return value
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?>[\s\S]*?<\/\1>/gi, "")
    .replace(/<\s*(\/?)\s*([a-z0-9]+)([^>]*)>/gi, (_match, slash: string, tagName: string, attributes: string) =>
      sanitizeTag(tagName, attributes, Boolean(slash))
    )
    .trim();
}

export function normalizeEditorContent(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "<p></p>";
  return isRichText(trimmed) ? sanitizeRichText(trimmed) : plainTextToHtml(trimmed);
}

