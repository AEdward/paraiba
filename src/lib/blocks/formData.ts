// Shared FormData -> block `data` parsing, used by both the site-wide page
// builder actions and the per-product page builder actions — the block
// types and their fields are identical either way.

import type { BlockType } from "./types";

export function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export function optStr(formData: FormData, key: string): string | undefined {
  const v = str(formData, key);
  return v || undefined;
}

export function readTheme(formData: FormData): "dark" | "light" {
  return formData.get("theme") === "light" ? "light" : "dark";
}

export function readJsonArray<T>(formData: FormData, key: string): T[] {
  try {
    const parsed = JSON.parse(String(formData.get(key) ?? "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function readBlockFormData(type: BlockType, formData: FormData): unknown {
  const theme = readTheme(formData);
  switch (type) {
    case "hero":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        headline: str(formData, "headline"),
        headlineHighlight: optStr(formData, "headlineHighlight"),
        subhead: optStr(formData, "subhead"),
        primaryLabel: optStr(formData, "primaryLabel"),
        primaryHref: optStr(formData, "primaryHref"),
        secondaryLabel: optStr(formData, "secondaryLabel"),
        secondaryHref: optStr(formData, "secondaryHref"),
        theme,
        align: formData.get("align") === "center" ? "center" : "left",
        showLogo3D: formData.get("showLogo3D") === "on",
      };
    case "richText": {
      const bodyRaw = str(formData, "body");
      let body;
      try {
        body = JSON.parse(bodyRaw);
      } catch {
        body = { type: "doc", content: [{ type: "paragraph" }] };
      }
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: optStr(formData, "heading"),
        body,
        theme,
        tint: formData.get("tint") === "on",
      };
    }
    case "cardGrid":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: optStr(formData, "heading"),
        body: optStr(formData, "body"),
        items: readJsonArray(formData, "itemsJson").filter(
          (item): item is { title: string } =>
            typeof item === "object" &&
            item !== null &&
            typeof (item as { title?: unknown }).title === "string" &&
            (item as { title: string }).title.trim() !== "",
        ),
        theme,
        columns: formData.get("columns") === "2" ? 2 : 3,
        anchorId: optStr(formData, "anchorId"),
      };
    case "statsQuote":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        body: optStr(formData, "body"),
        stats: readJsonArray(formData, "statsJson").filter(
          (s): s is { number: string; label: string } =>
            typeof s === "object" &&
            s !== null &&
            typeof (s as { label?: unknown }).label === "string" &&
            (s as { label: string }).label.trim() !== "",
        ),
        quote: str(formData, "quote"),
        theme,
      };
    case "quote": {
      const lines = str(formData, "linesText")
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      return {
        eyebrow: optStr(formData, "eyebrow"),
        intro: optStr(formData, "intro"),
        lines: lines.length > 0 ? lines : ["A short statement."],
        highlight: optStr(formData, "highlight"),
        theme,
      };
    }
    case "cta":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        body: optStr(formData, "body"),
        buttonLabel: str(formData, "buttonLabel"),
        buttonHref: str(formData, "buttonHref"),
        theme,
      };
    case "productsPreview":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        viewAllLabel: optStr(formData, "viewAllLabel"),
        limit: Math.max(1, Number.parseInt(str(formData, "limit"), 10) || 3),
        theme,
      };
    case "partnersTrustBar":
      return { eyebrow: optStr(formData, "eyebrow"), theme };
    case "openPositions":
      return { eyebrow: optStr(formData, "eyebrow"), heading: str(formData, "heading"), theme };
    case "contactPanel":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        body: optStr(formData, "body"),
        email: str(formData, "email"),
        location: str(formData, "location"),
        theme,
      };
    case "productsGrid":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        body: optStr(formData, "body"),
        emptyMessage: optStr(formData, "emptyMessage"),
        theme,
      };
  }
}
