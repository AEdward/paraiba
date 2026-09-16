import { Fragment, type ReactNode } from "react";
import type { RichDoc } from "./types";

type DocNode = { type: string; marks?: { type: string }[]; content?: DocNode[]; text?: string };

function renderMarks(text: string, marks: { type: string }[] = []): ReactNode {
  return marks.reduce<ReactNode>((acc, mark) => {
    if (mark.type === "bold") return <strong style={{ color: "var(--ink)" }}>{acc}</strong>;
    if (mark.type === "italic") return <em>{acc}</em>;
    return acc;
  }, text);
}

function renderInline(nodes: DocNode[] = []): ReactNode {
  return nodes.map((node, i) => (
    <Fragment key={i}>{node.type === "text" ? renderMarks(node.text ?? "", node.marks) : null}</Fragment>
  ));
}

// Flowing prose renderer for a TipTap JSON doc — headings, paragraphs, and
// lists in document order, with inline bold/italic preserved. Unlike
// lib/richDoc.ts (which groups content under headings into `RichSection[]`
// for the grouped-card/numbered-section layouts), this renders straight
// through for a normal rich-text page section.
export function renderRichDoc(doc: RichDoc): ReactNode {
  const content = (doc.content ?? []) as DocNode[];
  return content.map((node, i) => {
    if (node.type === "heading") {
      return (
        <h3
          key={i}
          className="font-display mt-8 text-lg font-bold first:mt-0"
          style={{ color: "var(--ink)" }}
        >
          {renderInline(node.content)}
        </h3>
      );
    }
    if (node.type === "paragraph") {
      return (
        <p key={i} className="mt-4 text-base leading-relaxed opacity-80 first:mt-0">
          {renderInline(node.content)}
        </p>
      );
    }
    if (node.type === "bulletList" || node.type === "orderedList") {
      const Tag = node.type === "bulletList" ? "ul" : "ol";
      return (
        <Tag
          key={i}
          className={`mt-4 ${node.type === "bulletList" ? "list-disc" : "list-decimal"} space-y-1 pl-5 text-base leading-relaxed opacity-80`}
        >
          {(node.content ?? []).map((item, j) => (
            <li key={j}>{renderInline(item.content?.[0]?.content)}</li>
          ))}
        </Tag>
      );
    }
    return null;
  });
}
