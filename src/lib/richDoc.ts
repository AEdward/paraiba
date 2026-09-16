// Bridges the old "## Heading" / "- bullet" plain-text convention (lib/richText.ts)
// with TipTap's JSON document format, so DeliverablesGrid/CaseStudySections can render
// either without caring which one a given project's saved content uses, and the editor
// can open old content pre-filled instead of blank.

import { parseRichSections, type RichSection } from "@/lib/richText";

type DocNode = { type: string; attrs?: Record<string, unknown>; content?: DocNode[]; text?: string };
type TiptapDoc = { type: "doc"; content: DocNode[] };

function extractText(node: DocNode): string {
  if (node.text) return node.text;
  if (node.content) return node.content.map(extractText).join("");
  return "";
}

function isTiptapDoc(value: unknown): value is TiptapDoc {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { type?: unknown }).type === "doc" &&
    Array.isArray((value as { content?: unknown }).content)
  );
}

function docToSections(doc: TiptapDoc): RichSection[] {
  const sections: RichSection[] = [];
  let current: RichSection = { heading: "", items: [], paragraphs: [] };
  let started = false;

  const flush = () => {
    if (current.heading || current.items.length > 0 || current.paragraphs.length > 0) {
      sections.push(current);
    }
  };

  for (const node of doc.content) {
    if (node.type === "heading") {
      if (started) flush();
      current = { heading: extractText(node).trim(), items: [], paragraphs: [] };
      started = true;
      continue;
    }
    started = true;
    if (node.type === "bulletList" || node.type === "orderedList") {
      for (const item of node.content ?? []) {
        const text = extractText(item).trim();
        if (text) current.items.push(text);
      }
    } else if (node.type === "paragraph") {
      const text = extractText(node).trim();
      if (text) current.paragraphs.push(text);
    }
  }
  flush();
  return sections;
}

// Used wherever content is rendered (DeliverablesGrid, CaseStudySections, and the
// save-time "is this actually empty?" check in the admin action).
export function getRichSections(raw: string | null | undefined): RichSection[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    if (isTiptapDoc(parsed)) return docToSections(parsed);
  } catch {
    // Not JSON — legacy plain-text convention.
  }
  return parseRichSections(raw);
}

function legacyTextToDoc(text: string): TiptapDoc {
  const sections = parseRichSections(text);
  if (sections.length === 0) {
    return { type: "doc", content: [{ type: "paragraph" }] };
  }

  const content: DocNode[] = [];
  for (const section of sections) {
    if (section.heading) {
      content.push({
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: section.heading }],
      });
    }
    for (const paragraph of section.paragraphs) {
      content.push({ type: "paragraph", content: [{ type: "text", text: paragraph }] });
    }
    if (section.items.length > 0) {
      content.push({
        type: "bulletList",
        content: section.items.map((item) => ({
          type: "listItem",
          content: [{ type: "paragraph", content: [{ type: "text", text: item }] }],
        })),
      });
    }
  }
  return { type: "doc", content };
}

// Used to initialize the editor's content — parses whatever's already stored
// (new-format JSON, old-format plain text, or nothing) into a TipTap document.
export function parseStoredDoc(raw: string | null | undefined): TiptapDoc {
  if (raw?.trim()) {
    try {
      const parsed = JSON.parse(raw);
      if (isTiptapDoc(parsed)) return parsed;
    } catch {
      // fall through to legacy conversion
    }
    return legacyTextToDoc(raw);
  }
  return { type: "doc", content: [{ type: "paragraph" }] };
}
