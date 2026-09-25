// Shared FormData -> block `data` parsing, used by both the site-wide page
// builder actions and the per-product page builder actions — the block
// types and their fields are identical either way.

import { db } from "@/lib/db";
import type { BlockType, MediaRef, SectionElement, SectionElementType, TechStackItem } from "./types";

const MAX_MEDIA_BYTES = 4 * 1024 * 1024;

// A section element's image slots arrive in `elementsJson` carrying only
// whatever was already saved (assetId/url) — a newly-picked file lives in a
// same-named <input type="file"> instead, keyed by the MediaRef's own stable
// id (see SectionEditor.tsx), since one element (a gallery) can hold several.
async function resolveMediaRef(ref: MediaRef, formData: FormData): Promise<MediaRef> {
  const file = formData.get(`file-${ref.id}`);
  if (file instanceof File && file.size > 0) {
    if (!file.type.startsWith("image/")) throw new Error("Uploaded file must be an image.");
    if (file.size > MAX_MEDIA_BYTES) throw new Error("Images must be smaller than 4MB.");
    const data = Buffer.from(await file.arrayBuffer());
    const asset = await db.mediaAsset.create({ data: { data, mimeType: file.type } });
    return { id: ref.id, assetId: asset.id, alt: ref.alt };
  }
  return { id: ref.id, assetId: ref.assetId, url: ref.url, alt: ref.alt };
}

function isMediaRef(v: unknown): v is MediaRef {
  return typeof v === "object" && v !== null && typeof (v as MediaRef).id === "string";
}

async function resolveElement(raw: unknown, formData: FormData): Promise<SectionElement | null> {
  if (typeof raw !== "object" || raw === null) return null;
  const el = raw as { id?: unknown; type?: unknown; data?: unknown };
  if (typeof el.id !== "string" || typeof el.type !== "string" || typeof el.data !== "object" || el.data === null) {
    return null;
  }
  const type = el.type as SectionElementType;
  const data = { ...(el.data as Record<string, unknown>) };

  switch (type) {
    case "image":
    case "cover":
    case "mediaText":
      if (isMediaRef(data.image)) data.image = await resolveMediaRef(data.image, formData);
      break;
    case "gallery":
      if (Array.isArray(data.images)) {
        data.images = await Promise.all(
          data.images.filter(isMediaRef).map((img: MediaRef) => resolveMediaRef(img, formData)),
        );
      }
      break;
    case "columns":
      if (Array.isArray(data.columns)) {
        data.columns = await Promise.all(
          data.columns.map(async (col: unknown) => {
            if (!Array.isArray(col)) return [];
            const resolved = await Promise.all(col.map((child) => resolveElement(child, formData)));
            return resolved.filter((c): c is SectionElement => c !== null);
          }),
        );
      }
      break;
    default:
      break;
  }

  return { id: el.id, type, data } as SectionElement;
}

async function readSectionElements(formData: FormData): Promise<SectionElement[]> {
  const raw = readJsonArray<unknown>(formData, "elementsJson");
  const resolved = await Promise.all(raw.map((el) => resolveElement(el, formData)));
  return resolved.filter((el): el is SectionElement => el !== null);
}

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

export async function readBlockFormData(type: BlockType, formData: FormData): Promise<unknown> {
  const theme = readTheme(formData);
  switch (type) {
    case "hero": {
      const sideList = readJsonArray<{ icon?: string; title?: string; subtitle?: string }>(formData, "sideListJson")
        .filter((item) => typeof item.title === "string" && item.title.trim() !== "");
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
        mockupImage: optStr(formData, "mockupImage"),
        sideList: sideList.length > 0 ? sideList : undefined,
      };
    }
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
        imageUrl: optStr(formData, "imageUrl"),
        imagePosition: formData.get("imagePosition") === "right" ? "right" : "left",
        imageFit: formData.get("imageFit") === "contain" ? "contain" : "cover",
      };
    }
    case "cardGrid": {
      const captionTitle = optStr(formData, "captionTitle");
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: optStr(formData, "heading"),
        headingHighlight: optStr(formData, "headingHighlight"),
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
        viewAllLabel: optStr(formData, "viewAllLabel"),
        viewAllHref: optStr(formData, "viewAllHref"),
        layout: formData.get("layout") === "split" ? "split" : "grid",
        cardStyle:
          formData.get("cardStyle") === "tinted"
            ? "tinted"
            : formData.get("cardStyle") === "plain"
              ? "plain"
              : "bordered",
        imageUrl: optStr(formData, "imageUrl"),
        imagePosition: formData.get("imagePosition") === "right" ? "right" : "left",
        imageCaption: captionTitle
          ? {
              icon: optStr(formData, "captionIcon"),
              title: captionTitle,
              subtitle: optStr(formData, "captionSubtitle"),
            }
          : undefined,
      };
    }
    case "industriesShowcase":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: str(formData, "heading"),
        body: optStr(formData, "body"),
        buttonLabel: optStr(formData, "buttonLabel"),
        buttonHref: optStr(formData, "buttonHref"),
        items: readJsonArray(formData, "itemsJson").filter(
          (item): item is { label: string } =>
            typeof item === "object" &&
            item !== null &&
            typeof (item as { label?: unknown }).label === "string" &&
            (item as { label: string }).label.trim() !== "",
        ),
        photoUrl: optStr(formData, "photoUrl"),
        photoHeading: optStr(formData, "photoHeading"),
        theme,
      };
    case "statsBar":
      return {
        items: readJsonArray(formData, "itemsJson").filter(
          (item): item is { label: string } =>
            typeof item === "object" &&
            item !== null &&
            typeof (item as { label?: unknown }).label === "string" &&
            (item as { label: string }).label.trim() !== "",
        ),
        theme,
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
        secondaryLabel: optStr(formData, "secondaryLabel"),
        secondaryHref: optStr(formData, "secondaryHref"),
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
    case "section":
      return { theme, elements: await readSectionElements(formData) };
    case "techStack":
      return {
        eyebrow: optStr(formData, "eyebrow"),
        heading: optStr(formData, "heading"),
        body: optStr(formData, "body"),
        items: readJsonArray<TechStackItem>(formData, "itemsJson").filter(
          (item): item is TechStackItem =>
            typeof item === "object" &&
            item !== null &&
            typeof item.icon === "string" &&
            typeof item.label === "string" &&
            item.label.trim() !== "",
        ),
        theme,
      };
  }
}
