"use client";

import { useState, type ReactNode } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Italic, Heading3, List, ListOrdered } from "lucide-react";
import { parseStoredDoc } from "@/lib/richDoc";

export function RichTextEditor({
  name,
  defaultValue,
  placeholder,
}: {
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
}) {
  const [json, setJson] = useState(() => JSON.stringify(parseStoredDoc(defaultValue)));

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [3] } }),
      Placeholder.configure({ placeholder: placeholder ?? "Start typing…" }),
    ],
    content: parseStoredDoc(defaultValue),
    editorProps: {
      attributes: { class: "rich-text-editor-content focus:outline-none" },
    },
    onUpdate: ({ editor }) => setJson(JSON.stringify(editor.getJSON())),
  });

  return (
    <div className="rounded-lg border" style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}>
      <div className="flex items-center gap-1 border-b px-2 py-1.5" style={{ borderColor: "var(--border-soft)" }}>
        <ToolbarButton
          active={!!editor?.isActive("heading", { level: 3 })}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          label="Heading"
        >
          <Heading3 size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={!!editor?.isActive("bold")}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          label="Bold"
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={!!editor?.isActive("italic")}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          label="Italic"
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={!!editor?.isActive("bulletList")}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          label="Bullet list"
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          active={!!editor?.isActive("orderedList")}
          disabled={!editor}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          label="Numbered list"
        >
          <ListOrdered size={15} />
        </ToolbarButton>
      </div>
      <div className="rounded-b-lg px-3 py-2.5 transition-shadow focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-teal)_18%,transparent)]">
        <EditorContent editor={editor} />
      </div>
      <input type="hidden" name={name} value={json} readOnly />
    </div>
  );
}

function ToolbarButton({
  active,
  disabled,
  onClick,
  label,
  children,
}: {
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-md transition-colors disabled:opacity-40"
      style={{
        color: active ? "var(--color-cream)" : "var(--ink)",
        background: active ? "var(--color-indigo)" : "transparent",
        opacity: active ? 1 : 0.7,
      }}
    >
      {children}
    </button>
  );
}
