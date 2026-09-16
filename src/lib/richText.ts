// Both fields use the same tiny convention: "## Heading" starts a block,
// followed by either "- bullet" lines or plain paragraph lines, separated
// by blank lines. No HTML/markdown library — parsed into plain data so
// components render real React elements instead of dangerouslySetInnerHTML.

export type RichSection = {
  heading: string;
  items: string[]; // bullet lines, if any
  paragraphs: string[]; // non-bullet lines, if any
};

export function parseRichSections(text: string | null | undefined): RichSection[] {
  if (!text?.trim()) return [];

  return text
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      if (lines.length === 0) return null;

      const headingLine = lines[0].startsWith("## ") ? lines[0].slice(3).trim() : null;
      const bodyLines = headingLine ? lines.slice(1) : lines;

      const items = bodyLines.filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim());
      const paragraphs = bodyLines.filter((l) => !l.startsWith("- "));

      return {
        heading: headingLine ?? "",
        items,
        paragraphs,
      };
    })
    .filter((section): section is RichSection => section !== null);
}
