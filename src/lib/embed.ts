// Client-safe: turns a pasted URL into an embeddable iframe src for the
// providers we actually expect (no live oEmbed lookup — that would need a
// server round-trip per render). Falls back to a plain "open link" card for
// anything else.

export type EmbedInfo = { kind: "iframe"; src: string; aspect: "video" | "square" } | { kind: "link" };

export function resolveEmbed(rawUrl: string): EmbedInfo {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return { kind: "link" };
  }
  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtube.com" || host === "m.youtube.com") {
    const id = url.searchParams.get("v") ?? (url.pathname.startsWith("/embed/") ? url.pathname.split("/")[2] : null);
    if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}`, aspect: "video" };
  }
  if (host === "youtu.be") {
    const id = url.pathname.slice(1);
    if (id) return { kind: "iframe", src: `https://www.youtube.com/embed/${id}`, aspect: "video" };
  }
  if (host === "vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    if (id) return { kind: "iframe", src: `https://player.vimeo.com/video/${id}`, aspect: "video" };
  }
  if (host === "open.spotify.com") {
    return { kind: "iframe", src: `https://open.spotify.com/embed${url.pathname}`, aspect: "square" };
  }
  if (host === "soundcloud.com") {
    return {
      kind: "iframe",
      src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(rawUrl)}`,
      aspect: "square",
    };
  }
  if (host === "instagram.com") {
    return { kind: "iframe", src: `${url.origin}${url.pathname.replace(/\/$/, "")}/embed`, aspect: "square" };
  }
  if (host === "x.com" || host === "twitter.com") {
    // No public no-auth embed src for X/Twitter without their widgets.js —
    // link out instead rather than silently failing to render anything.
    return { kind: "link" };
  }
  return { kind: "link" };
}
