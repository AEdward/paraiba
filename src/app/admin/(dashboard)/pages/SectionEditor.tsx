"use client";

import { useId, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronUp, GripVertical, ImageOff, Plus, Trash2 } from "lucide-react";
import {
  ICON_KEYS,
  SECTION_ELEMENT_CATEGORIES,
  SECTION_ELEMENT_DESCRIPTIONS,
  SECTION_ELEMENT_LABELS,
  type ButtonItem,
  type MediaRef,
  type SectionData,
  type SectionElement,
  type SectionElementType,
} from "@/lib/blocks/types";
import { newElement } from "@/lib/blocks/defaults";
import { mediaSrc } from "@/lib/media";
import { Field, TextAreaField, ThemeField, inputClass, inputStyle, labelClass } from "./formFields";

export function SectionEditor({ data }: { data: SectionData }) {
  const [elements, setElements] = useState<SectionElement[]>(data.elements);

  return (
    <div className="flex flex-col gap-4">
      <ElementList elements={elements} onChange={setElements} depth={0} />
      <ThemeField defaultValue={data.theme} />
      <input type="hidden" name="elementsJson" value={JSON.stringify(elements)} readOnly />
    </div>
  );
}

function ElementList({
  elements,
  onChange,
  depth,
}: {
  elements: SectionElement[];
  onChange: (elements: SectionElement[]) => void;
  depth: number;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const dndId = useId();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = elements.findIndex((el) => el.id === active.id);
    const newIndex = elements.findIndex((el) => el.id === over.id);
    onChange(arrayMove(elements, oldIndex, newIndex));
  }

  function updateOne(id: string, next: SectionElement) {
    onChange(elements.map((el) => (el.id === id ? next : el)));
  }

  function removeOne(id: string) {
    onChange(elements.filter((el) => el.id !== id));
    if (openId === id) setOpenId(null);
  }

  // Cap nesting at one level deep — a column can't itself contain columns.
  const excludeTypes: SectionElementType[] = depth > 0 ? ["columns"] : [];

  return (
    <div className={depth > 0 ? "" : "flex flex-col gap-3"}>
      <DndContext id={dndId} sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={elements.map((el) => el.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-3">
            {elements.map((element) => (
              <ElementCard
                key={element.id}
                element={element}
                open={openId === element.id}
                onToggle={() => setOpenId((id) => (id === element.id ? null : element.id))}
                onChange={(next) => updateOne(element.id, next)}
                onDelete={() => removeOne(element.id)}
                depth={depth}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {elements.length === 0 && (
        <p className="py-2 text-center text-xs opacity-50">
          {depth > 0 ? "No elements in this column yet." : "No elements yet — add the first one below."}
        </p>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setAddOpen((v) => !v)}
          className="font-display mt-1 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold"
          style={{ borderColor: "var(--border-soft)", color: "var(--color-teal)" }}
        >
          <Plus size={13} /> Add element
        </button>

        {addOpen && (
          <div
            className="absolute z-10 mt-2 w-80 max-w-[90vw] rounded-xl border p-2 shadow-lg"
            style={{ borderColor: "var(--border-soft)", background: "var(--surface)" }}
          >
            {SECTION_ELEMENT_CATEGORIES.map((category) => {
              const visible = category.types.filter((t) => !excludeTypes.includes(t));
              if (visible.length === 0) return null;
              return (
                <div key={category.label} className="mb-2 last:mb-0">
                  <p className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase opacity-40">
                    {category.label}
                  </p>
                  {visible.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        onChange([...elements, newElement(type)]);
                        setAddOpen(false);
                      }}
                      className="block w-full rounded-lg px-2 py-1.5 text-left hover:opacity-100"
                      style={{ opacity: 0.85 }}
                    >
                      <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                        {SECTION_ELEMENT_LABELS[type]}
                      </p>
                      <p className="text-xs opacity-60">{SECTION_ELEMENT_DESCRIPTIONS[type]}</p>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function ElementCard({
  element,
  open,
  onToggle,
  onChange,
  onDelete,
  depth,
}: {
  element: SectionElement;
  open: boolean;
  onToggle: () => void;
  onChange: (next: SectionElement) => void;
  onDelete: () => void;
  depth: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        borderColor: "var(--border-soft)",
        background: depth > 0 ? "color-mix(in srgb, var(--surface) 60%, transparent)" : "var(--surface)",
        opacity: isDragging ? 0.5 : 1,
      }}
      className="rounded-xl border"
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
          className="cursor-grab touch-none opacity-50 hover:opacity-90 active:cursor-grabbing"
        >
          <GripVertical size={15} />
        </button>
        <button type="button" onClick={onToggle} className="flex flex-1 items-center justify-between text-left">
          <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
            {SECTION_ELEMENT_LABELS[element.type]}
          </span>
          {open ? <ChevronUp size={15} opacity={0.5} /> : <ChevronDown size={15} opacity={0.5} />}
        </button>
        <button type="button" onClick={onDelete} aria-label="Delete element" style={{ color: "var(--color-ember)" }}>
          <Trash2 size={15} />
        </button>
      </div>

      {open && (
        <div className="border-t px-3.5 py-3.5" style={{ borderColor: "var(--border-soft)" }}>
          <ElementFields element={element} onChange={onChange} depth={depth} />
        </div>
      )}
    </div>
  );
}

function ImagePicker({ value, onChange, label = "Image" }: { value: MediaRef; onChange: (next: MediaRef) => void; label?: string }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const src = previewUrl ?? mediaSrc(value);

  return (
    <div>
      <label className={labelClass} style={{ color: "var(--ink)" }}>
        {label}
      </label>
      <div className="flex items-start gap-3">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
          style={{ borderColor: "var(--border-soft)", background: "var(--background)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : <ImageOff size={18} opacity={0.3} />}
        </div>
        <div className="flex-1">
          <input
            type="file"
            name={`file-${value.id}`}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreviewUrl(URL.createObjectURL(file));
            }}
            className="block w-full text-xs file:mr-2 file:rounded-md file:border-0 file:px-2.5 file:py-1 file:text-xs file:font-semibold"
          />
          <input
            type="text"
            placeholder="Or paste an image URL"
            value={value.url ?? ""}
            onChange={(e) => onChange({ ...value, url: e.target.value || undefined })}
            className={`${inputClass} mt-1.5`}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Alt text — optional"
            value={value.alt ?? ""}
            onChange={(e) => onChange({ ...value, alt: e.target.value || undefined })}
            className={`${inputClass} mt-1.5`}
            style={inputStyle}
          />
        </div>
      </div>
    </div>
  );
}

function ElementFields({
  element,
  onChange,
  depth,
}: {
  element: SectionElement;
  onChange: (next: SectionElement) => void;
  depth: number;
}) {
  switch (element.type) {
    case "heading":
      return (
        <div className="flex flex-col gap-3">
          <Field
            label="Text"
            name=""
            defaultValue={element.data.text}
            onChangeValue={(text) => onChange({ ...element, data: { ...element.data, text } })}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass} style={{ color: "var(--ink)" }}>
                Level
              </label>
              <select
                value={element.data.level}
                onChange={(e) =>
                  onChange({ ...element, data: { ...element.data, level: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6 } })
                }
                className={inputClass}
                style={inputStyle}
              >
                {[1, 2, 3, 4, 5, 6].map((l) => (
                  <option key={l} value={l}>
                    H{l}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} style={{ color: "var(--ink)" }}>
                Align
              </label>
              <select
                value={element.data.align}
                onChange={(e) => onChange({ ...element, data: { ...element.data, align: e.target.value as "left" | "center" } })}
                className={inputClass}
                style={inputStyle}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
              </select>
            </div>
          </div>
        </div>
      );
    case "paragraph":
      return (
        <TextAreaField
          label="Text"
          name=""
          defaultValue={element.data.text}
          rows={4}
          onChangeValue={(text) => onChange({ ...element, data: { text } })}
        />
      );
    case "list":
      return (
        <div className="flex flex-col gap-3">
          <div>
            <label className={labelClass} style={{ color: "var(--ink)" }}>
              Style
            </label>
            <select
              value={element.data.style}
              onChange={(e) => onChange({ ...element, data: { ...element.data, style: e.target.value as "bullet" | "number" } })}
              className={inputClass}
              style={inputStyle}
            >
              <option value="bullet">Bulleted</option>
              <option value="number">Numbered</option>
            </select>
          </div>
          <TextAreaField
            label="Items (one per line)"
            name=""
            defaultValue={element.data.items.join("\n")}
            rows={4}
            onChangeValue={(text) =>
              onChange({
                ...element,
                data: { ...element.data, items: text.split("\n").map((l) => l.trim()).filter(Boolean) },
              })
            }
          />
        </div>
      );
    case "quote":
    case "pullquote":
      return (
        <div className="flex flex-col gap-3">
          <TextAreaField
            label="Text"
            name=""
            defaultValue={element.data.text}
            rows={3}
            onChangeValue={(text) => onChange({ ...element, data: { ...element.data, text } })}
          />
          <Field
            label="Citation — optional"
            name=""
            defaultValue={element.data.citation}
            onChangeValue={(citation) => onChange({ ...element, data: { ...element.data, citation: citation || undefined } })}
          />
        </div>
      );
    case "code":
      return (
        <div className="flex flex-col gap-3">
          <TextAreaField
            label="Code"
            name=""
            defaultValue={element.data.code}
            rows={5}
            onChangeValue={(code) => onChange({ ...element, data: { ...element.data, code } })}
          />
          <Field
            label="Language label — optional"
            name=""
            placeholder="tsx, python, bash…"
            defaultValue={element.data.language}
            onChangeValue={(language) => onChange({ ...element, data: { ...element.data, language: language || undefined } })}
          />
        </div>
      );
    case "preformatted":
      return (
        <TextAreaField
          label="Text"
          name=""
          defaultValue={element.data.text}
          rows={5}
          onChangeValue={(text) => onChange({ ...element, data: { text } })}
        />
      );
    case "details":
      return (
        <div className="flex flex-col gap-3">
          <Field
            label="Summary"
            name=""
            defaultValue={element.data.summary}
            onChangeValue={(summary) => onChange({ ...element, data: { ...element.data, summary } })}
          />
          <TextAreaField
            label="Body"
            name=""
            defaultValue={element.data.body}
            rows={3}
            onChangeValue={(body) => onChange({ ...element, data: { ...element.data, body } })}
          />
        </div>
      );
    case "table": {
      const { headers, rows } = element.data;
      return (
        <div className="flex flex-col gap-3">
          <label className={labelClass} style={{ color: "var(--ink)" }}>
            Table
          </label>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="p-1">
                      <input
                        value={h}
                        onChange={(e) => {
                          const nextHeaders = headers.map((v, idx) => (idx === i ? e.target.value : v));
                          onChange({ ...element, data: { ...element.data, headers: nextHeaders } });
                        }}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </th>
                  ))}
                  <th className="p-1">
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          ...element,
                          data: {
                            headers: [...headers, `Column ${headers.length + 1}`],
                            rows: rows.map((r) => [...r, ""]),
                          },
                        })
                      }
                      className="text-xs font-medium"
                      style={{ color: "var(--color-teal)" }}
                    >
                      + Col
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-1">
                        <input
                          value={cell}
                          onChange={(e) => {
                            const nextRows = rows.map((r, idx) =>
                              idx === ri ? r.map((v, cidx) => (cidx === ci ? e.target.value : v)) : r,
                            );
                            onChange({ ...element, data: { ...element.data, rows: nextRows } });
                          }}
                          className={inputClass}
                          style={inputStyle}
                        />
                      </td>
                    ))}
                    <td className="p-1">
                      <button
                        type="button"
                        onClick={() => onChange({ ...element, data: { ...element.data, rows: rows.filter((_, idx) => idx !== ri) } })}
                        disabled={rows.length <= 1}
                        className="text-xs font-medium disabled:opacity-30"
                        style={{ color: "var(--color-ember)" }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={() => onChange({ ...element, data: { ...element.data, rows: [...rows, headers.map(() => "")] } })}
            className="w-fit text-sm font-medium"
            style={{ color: "var(--color-teal)" }}
          >
            + Add row
          </button>
        </div>
      );
    }
    case "image":
      return (
        <div className="flex flex-col gap-3">
          <ImagePicker value={element.data.image} onChange={(image) => onChange({ ...element, data: { ...element.data, image } })} />
          <Field
            label="Caption — optional"
            name=""
            defaultValue={element.data.caption}
            onChangeValue={(caption) => onChange({ ...element, data: { ...element.data, caption: caption || undefined } })}
          />
        </div>
      );
    case "gallery":
      return (
        <div className="flex flex-col gap-3">
          {element.data.images.map((img, i) => (
            <div key={img.id} className="rounded-lg border p-2.5" style={{ borderColor: "var(--border-soft)" }}>
              <ImagePicker
                label={`Image ${i + 1}`}
                value={img}
                onChange={(next) => {
                  const images = element.data.images.map((im, idx) => (idx === i ? next : im));
                  onChange({ ...element, data: { images } });
                }}
              />
              <button
                type="button"
                onClick={() => onChange({ ...element, data: { images: element.data.images.filter((_, idx) => idx !== i) } })}
                disabled={element.data.images.length <= 1}
                className="mt-2 text-xs font-medium disabled:opacity-30"
                style={{ color: "var(--color-ember)" }}
              >
                Remove image
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const fresh = newElement("image").data.image;
              onChange({ ...element, data: { images: [...element.data.images, fresh] } });
            }}
            className="w-fit text-sm font-medium"
            style={{ color: "var(--color-teal)" }}
          >
            + Add image
          </button>
        </div>
      );
    case "video":
      return (
        <div className="flex flex-col gap-3">
          <Field
            label="Video URL (YouTube, Vimeo, or a direct video file link)"
            name=""
            defaultValue={element.data.url}
            onChangeValue={(url) => onChange({ ...element, data: { ...element.data, url } })}
          />
          <Field
            label="Caption — optional"
            name=""
            defaultValue={element.data.caption}
            onChangeValue={(caption) => onChange({ ...element, data: { ...element.data, caption: caption || undefined } })}
          />
        </div>
      );
    case "audio":
      return (
        <div className="flex flex-col gap-3">
          <Field
            label="Audio file URL"
            name=""
            defaultValue={element.data.url}
            onChangeValue={(url) => onChange({ ...element, data: { ...element.data, url } })}
          />
          <Field
            label="Caption — optional"
            name=""
            defaultValue={element.data.caption}
            onChangeValue={(caption) => onChange({ ...element, data: { ...element.data, caption: caption || undefined } })}
          />
        </div>
      );
    case "file":
      return (
        <div className="flex flex-col gap-3">
          <Field
            label="File URL"
            name=""
            defaultValue={element.data.url}
            placeholder="https://…/brochure.pdf"
            onChangeValue={(url) => onChange({ ...element, data: { ...element.data, url } })}
          />
          <Field
            label="Link label"
            name=""
            defaultValue={element.data.label}
            onChangeValue={(label) => onChange({ ...element, data: { ...element.data, label } })}
          />
        </div>
      );
    case "cover":
      return (
        <div className="flex flex-col gap-3">
          <ImagePicker
            label="Background image"
            value={element.data.image}
            onChange={(image) => onChange({ ...element, data: { ...element.data, image } })}
          />
          <Field
            label="Heading — optional"
            name=""
            defaultValue={element.data.heading}
            onChangeValue={(heading) => onChange({ ...element, data: { ...element.data, heading: heading || undefined } })}
          />
          <TextAreaField
            label="Body — optional"
            name=""
            defaultValue={element.data.body}
            rows={2}
            onChangeValue={(body) => onChange({ ...element, data: { ...element.data, body: body || undefined } })}
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Button label — optional"
              name=""
              defaultValue={element.data.buttonLabel}
              onChangeValue={(buttonLabel) => onChange({ ...element, data: { ...element.data, buttonLabel: buttonLabel || undefined } })}
            />
            <Field
              label="Button link — optional"
              name=""
              defaultValue={element.data.buttonHref}
              onChangeValue={(buttonHref) => onChange({ ...element, data: { ...element.data, buttonHref: buttonHref || undefined } })}
            />
          </div>
        </div>
      );
    case "mediaText":
      return (
        <div className="flex flex-col gap-3">
          <ImagePicker value={element.data.image} onChange={(image) => onChange({ ...element, data: { ...element.data, image } })} />
          <Field
            label="Heading — optional"
            name=""
            defaultValue={element.data.heading}
            onChangeValue={(heading) => onChange({ ...element, data: { ...element.data, heading: heading || undefined } })}
          />
          <TextAreaField
            label="Body — optional"
            name=""
            defaultValue={element.data.body}
            rows={2}
            onChangeValue={(body) => onChange({ ...element, data: { ...element.data, body: body || undefined } })}
          />
          <div>
            <label className={labelClass} style={{ color: "var(--ink)" }}>
              Image position
            </label>
            <select
              value={element.data.mediaPosition}
              onChange={(e) => onChange({ ...element, data: { ...element.data, mediaPosition: e.target.value as "left" | "right" } })}
              className={inputClass}
              style={inputStyle}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      );
    case "icon":
      return (
        <div className="flex flex-col gap-3">
          <div>
            <label className={labelClass} style={{ color: "var(--ink)" }}>
              Icon
            </label>
            <select
              value={element.data.icon}
              onChange={(e) => onChange({ ...element, data: { ...element.data, icon: e.target.value as (typeof ICON_KEYS)[number] } })}
              className={inputClass}
              style={inputStyle}
            >
              {ICON_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Label — optional"
            name=""
            defaultValue={element.data.label}
            onChangeValue={(label) => onChange({ ...element, data: { ...element.data, label: label || undefined } })}
          />
        </div>
      );
    case "buttons": {
      const buttons = element.data.buttons;
      return (
        <div className="flex flex-col gap-3">
          {buttons.map((btn, i) => (
            <div key={i} className="rounded-lg border p-2.5" style={{ borderColor: "var(--border-soft)" }}>
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Label"
                  value={btn.label}
                  onChange={(e) => {
                    const next = buttons.map((b, idx) => (idx === i ? { ...b, label: e.target.value } : b));
                    onChange({ ...element, data: { buttons: next } });
                  }}
                  className={inputClass}
                  style={inputStyle}
                />
                <input
                  placeholder="Link"
                  value={btn.href}
                  onChange={(e) => {
                    const next = buttons.map((b, idx) => (idx === i ? { ...b, href: e.target.value } : b));
                    onChange({ ...element, data: { buttons: next } });
                  }}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <select
                  value={btn.style}
                  onChange={(e) => {
                    const next = buttons.map((b, idx) => (idx === i ? { ...b, style: e.target.value as ButtonItem["style"] } : b));
                    onChange({ ...element, data: { buttons: next } });
                  }}
                  className={inputClass}
                  style={{ ...inputStyle, maxWidth: "10rem" }}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
                <button
                  type="button"
                  onClick={() => onChange({ ...element, data: { buttons: buttons.filter((_, idx) => idx !== i) } })}
                  disabled={buttons.length <= 1}
                  className="text-xs font-medium disabled:opacity-30"
                  style={{ color: "var(--color-ember)" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange({ ...element, data: { buttons: [...buttons, { label: "Button", href: "#", style: "secondary" }] } })}
            className="w-fit text-sm font-medium"
            style={{ color: "var(--color-teal)" }}
          >
            + Add button
          </button>
        </div>
      );
    }
    case "columns": {
      const columns = element.data.columns;
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className={labelClass} style={{ color: "var(--ink)" }}>
              {columns.length} columns
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChange({ ...element, data: { columns: [...columns, []] } })}
                disabled={columns.length >= 3}
                className="text-xs font-medium disabled:opacity-30"
                style={{ color: "var(--color-teal)" }}
              >
                + Add column
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...element, data: { columns: columns.slice(0, -1) } })}
                disabled={columns.length <= 2}
                className="text-xs font-medium disabled:opacity-30"
                style={{ color: "var(--color-ember)" }}
              >
                Remove column
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {columns.map((col, i) => (
              <div key={i} className="rounded-lg border p-3" style={{ borderColor: "var(--border-soft)" }}>
                <p className="mb-2 text-xs font-bold tracking-widest uppercase opacity-40">Column {i + 1}</p>
                <ElementList
                  elements={col}
                  onChange={(next) => {
                    const nextColumns = columns.map((c, idx) => (idx === i ? next : c));
                    onChange({ ...element, data: { columns: nextColumns } });
                  }}
                  depth={depth + 1}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "separator":
      return <p className="text-xs opacity-50">A plain dividing line — no options.</p>;
    case "spacer":
      return (
        <div>
          <label className={labelClass} style={{ color: "var(--ink)" }}>
            Height
          </label>
          <select
            value={element.data.height}
            onChange={(e) => onChange({ ...element, data: { height: e.target.value as "sm" | "md" | "lg" } })}
            className={inputClass}
            style={inputStyle}
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </div>
      );
    case "embed":
      return (
        <div className="flex flex-col gap-3">
          <Field
            label="URL (YouTube, Vimeo, Instagram, Spotify, SoundCloud…)"
            name=""
            defaultValue={element.data.url}
            onChangeValue={(url) => onChange({ ...element, data: { ...element.data, url } })}
          />
          <Field
            label="Caption — optional"
            name=""
            defaultValue={element.data.caption}
            onChangeValue={(caption) => onChange({ ...element, data: { ...element.data, caption: caption || undefined } })}
          />
        </div>
      );
    default:
      return null;
  }
}
