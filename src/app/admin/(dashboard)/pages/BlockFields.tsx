"use client";

import { useState } from "react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import {
  ICON_KEYS,
  type BlockRecord,
  type CardGridData,
  type CardGridItem,
  type ContactPanelData,
  type CtaData,
  type HeroData,
  type OpenPositionsData,
  type PartnersTrustBarData,
  type ProductsGridData,
  type ProductsPreviewData,
  type QuoteData,
  type RichTextData,
  type StatItem,
  type StatsBarData,
  type StatsBarItem,
  type StatsQuoteData,
} from "@/lib/blocks/types";

const inputClass =
  "w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-(--color-teal)";
const inputStyle = {
  borderColor: "var(--border-soft)",
  background: "var(--surface)",
  color: "var(--foreground)",
};
const labelClass = "mb-1.5 block text-sm font-medium";

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass} style={{ color: "var(--ink)" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputClass}
        style={inputStyle}
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass} style={{ color: "var(--ink)" }}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputClass}
        style={inputStyle}
      />
    </div>
  );
}

function ThemeField({ defaultValue }: { defaultValue: string }) {
  return (
    <div>
      <label htmlFor="theme" className={labelClass} style={{ color: "var(--ink)" }}>
        Theme
      </label>
      <select id="theme" name="theme" defaultValue={defaultValue} className={inputClass} style={inputStyle}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  );
}

function ItemsEditor({ defaultItems }: { defaultItems: CardGridItem[] }) {
  const [items, setItems] = useState<CardGridItem[]>(
    defaultItems.length > 0 ? defaultItems : [{ title: "" }],
  );

  function update(i: number, patch: Partial<CardGridItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <label className={labelClass} style={{ color: "var(--ink)" }}>
        Cards
      </label>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border p-3" style={{ borderColor: "var(--border-soft)" }}>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Title"
                value={item.title}
                onChange={(e) => update(i, { title: e.target.value })}
                className={inputClass}
                style={inputStyle}
              />
              <input
                placeholder="Number (e.g. 01) — optional"
                value={item.number ?? ""}
                onChange={(e) => update(i, { number: e.target.value || undefined })}
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <input
                placeholder="Small label — optional"
                value={item.label ?? ""}
                onChange={(e) => update(i, { label: e.target.value || undefined })}
                className={inputClass}
                style={inputStyle}
              />
              <select
                value={item.icon ?? ""}
                onChange={(e) => update(i, { icon: (e.target.value || undefined) as CardGridItem["icon"] })}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">No icon</option>
                {ICON_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Description — optional"
              rows={2}
              value={item.description ?? ""}
              onChange={(e) => update(i, { description: e.target.value || undefined })}
              className={`${inputClass} mt-2`}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
              disabled={items.length <= 1}
              className="mt-2 text-xs font-medium disabled:opacity-30"
              style={{ color: "var(--color-ember)" }}
            >
              Remove card
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { title: "" }])}
        className="mt-3 text-sm font-medium"
        style={{ color: "var(--color-teal)" }}
      >
        + Add card
      </button>
      <input type="hidden" name="itemsJson" value={JSON.stringify(items)} readOnly />
    </div>
  );
}

function StatsEditor({ defaultStats }: { defaultStats: StatItem[] }) {
  const [stats, setStats] = useState<StatItem[]>(
    defaultStats.length > 0 ? defaultStats : [{ number: "", label: "" }],
  );

  function update(i: number, patch: Partial<StatItem>) {
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  return (
    <div>
      <label className={labelClass} style={{ color: "var(--ink)" }}>
        Stats
      </label>
      <div className="flex flex-col gap-2">
        {stats.map((s, i) => (
          <div key={i} className="flex gap-2">
            <input
              placeholder="01"
              value={s.number}
              onChange={(e) => update(i, { number: e.target.value })}
              className={inputClass}
              style={{ ...inputStyle, maxWidth: "5rem" }}
            />
            <input
              placeholder="Label"
              value={s.label}
              onChange={(e) => update(i, { label: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setStats((prev) => prev.filter((_, idx) => idx !== i))}
              disabled={stats.length <= 1}
              className="text-xs font-medium disabled:opacity-30"
              style={{ color: "var(--color-ember)" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setStats((prev) => [...prev, { number: "", label: "" }])}
        className="mt-2 text-sm font-medium"
        style={{ color: "var(--color-teal)" }}
      >
        + Add stat
      </button>
      <input type="hidden" name="statsJson" value={JSON.stringify(stats)} readOnly />
    </div>
  );
}

function StatsBarEditor({ defaultItems }: { defaultItems: StatsBarItem[] }) {
  const [items, setItems] = useState<StatsBarItem[]>(
    defaultItems.length > 0 ? defaultItems : [{ label: "" }],
  );

  function update(i: number, patch: Partial<StatsBarItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <label className={labelClass} style={{ color: "var(--ink)" }}>
        Stats
      </label>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border p-3" style={{ borderColor: "var(--border-soft)" }}>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Label — e.g. Trusted by 100+ Businesses"
                value={item.label}
                onChange={(e) => update(i, { label: e.target.value })}
                className={inputClass}
                style={inputStyle}
              />
              <select
                value={item.icon ?? ""}
                onChange={(e) => update(i, { icon: (e.target.value || undefined) as StatsBarItem["icon"] })}
                className={inputClass}
                style={inputStyle}
              >
                <option value="">No icon</option>
                {ICON_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <input
              placeholder="Sublabel — optional"
              value={item.sublabel ?? ""}
              onChange={(e) => update(i, { sublabel: e.target.value || undefined })}
              className={`${inputClass} mt-2`}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
              disabled={items.length <= 1}
              className="mt-2 text-xs font-medium disabled:opacity-30"
              style={{ color: "var(--color-ember)" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { label: "" }])}
        className="mt-3 text-sm font-medium"
        style={{ color: "var(--color-teal)" }}
      >
        + Add stat
      </button>
      <input type="hidden" name="itemsJson" value={JSON.stringify(items)} readOnly />
    </div>
  );
}

export function BlockFields({ block }: { block: BlockRecord }) {
  switch (block.type) {
    case "hero": {
      const data = block.data as HeroData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Headline" name="headline" defaultValue={data.headline} required />
          <Field
            label="Headline highlight (gradient, dark theme only) — optional"
            name="headlineHighlight"
            defaultValue={data.headlineHighlight}
          />
          <TextAreaField label="Subhead" name="subhead" defaultValue={data.subhead} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary button label" name="primaryLabel" defaultValue={data.primaryLabel} />
            <Field label="Primary button link" name="primaryHref" defaultValue={data.primaryHref} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Secondary button label" name="secondaryLabel" defaultValue={data.secondaryLabel} />
            <Field label="Secondary button link" name="secondaryHref" defaultValue={data.secondaryHref} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="align" className={labelClass} style={{ color: "var(--ink)" }}>
                Alignment
              </label>
              <select id="align" name="align" defaultValue={data.align} className={inputClass} style={inputStyle}>
                <option value="left">Left</option>
                <option value="center">Center</option>
              </select>
            </div>
            <ThemeField defaultValue={data.theme} />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="showLogo3D" value="on" defaultChecked={data.showLogo3D} />
            Show the spinning 3D logo (2-column layout)
          </label>
        </div>
      );
    }
    case "richText": {
      const data = block.data as RichTextData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Heading — optional" name="heading" defaultValue={data.heading} />
          <div>
            <label className={labelClass} style={{ color: "var(--ink)" }}>
              Body
            </label>
            <RichTextEditor name="body" defaultValue={JSON.stringify(data.body)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="tint" value="on" defaultChecked={data.tint} />
              Subtle color wash background
            </label>
            <ThemeField defaultValue={data.theme} />
          </div>
        </div>
      );
    }
    case "cardGrid": {
      const data = block.data as CardGridData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Heading — optional" name="heading" defaultValue={data.heading} />
          <TextAreaField label="Intro text — optional" name="body" defaultValue={data.body} rows={2} />
          <ItemsEditor defaultItems={data.items} />
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="columns" className={labelClass} style={{ color: "var(--ink)" }}>
                Columns
              </label>
              <select
                id="columns"
                name="columns"
                defaultValue={String(data.columns)}
                className={inputClass}
                style={inputStyle}
              >
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <Field label="Anchor id — optional" name="anchorId" defaultValue={data.anchorId} placeholder="solutions" />
            <ThemeField defaultValue={data.theme} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="'View all' link label — optional" name="viewAllLabel" defaultValue={data.viewAllLabel} placeholder="View All Services" />
            <Field label="'View all' link href — optional" name="viewAllHref" defaultValue={data.viewAllHref} placeholder="/services" />
          </div>
        </div>
      );
    }
    case "statsBar": {
      const data = block.data as StatsBarData;
      return (
        <div className="flex flex-col gap-4">
          <StatsBarEditor defaultItems={data.items} />
          <ThemeField defaultValue={data.theme} />
        </div>
      );
    }
    case "statsQuote": {
      const data = block.data as StatsQuoteData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <TextAreaField
            label="Heading (a line break starts a new line)"
            name="heading"
            defaultValue={data.heading}
            rows={2}
          />
          <TextAreaField label="Body — optional" name="body" defaultValue={data.body} rows={2} />
          <StatsEditor defaultStats={data.stats} />
          <TextAreaField label="Quote" name="quote" defaultValue={data.quote} />
          <ThemeField defaultValue={data.theme} />
        </div>
      );
    }
    case "quote": {
      const data = block.data as QuoteData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Intro line — optional" name="intro" defaultValue={data.intro} />
          <TextAreaField
            label="Statement (one line per row)"
            name="linesText"
            defaultValue={data.lines.join("\n")}
            rows={4}
          />
          <Field label="Highlighted closing line — optional" name="highlight" defaultValue={data.highlight} />
          <ThemeField defaultValue={data.theme} />
        </div>
      );
    }
    case "cta": {
      const data = block.data as CtaData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Heading" name="heading" defaultValue={data.heading} required />
          <TextAreaField label="Body — optional" name="body" defaultValue={data.body} rows={2} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button label" name="buttonLabel" defaultValue={data.buttonLabel} required />
            <Field label="Button link" name="buttonHref" defaultValue={data.buttonHref} required />
          </div>
          <ThemeField defaultValue={data.theme} />
        </div>
      );
    }
    case "productsPreview": {
      const data = block.data as ProductsPreviewData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Heading" name="heading" defaultValue={data.heading} required />
          <div className="grid grid-cols-3 gap-4">
            <Field label={'"View all" label — optional'} name="viewAllLabel" defaultValue={data.viewAllLabel} />
            <Field label="How many to show" name="limit" type="number" defaultValue={data.limit} />
            <ThemeField defaultValue={data.theme} />
          </div>
          <p className="text-xs opacity-50">Products shown here come live from Admin → Products.</p>
        </div>
      );
    }
    case "partnersTrustBar": {
      const data = block.data as PartnersTrustBarData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <ThemeField defaultValue={data.theme} />
          <p className="text-xs opacity-50">
            Logos shown here come live from Admin → Partners, and this section hides itself
            automatically when there are none.
          </p>
        </div>
      );
    }
    case "openPositions": {
      const data = block.data as OpenPositionsData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Heading" name="heading" defaultValue={data.heading} required />
          <ThemeField defaultValue={data.theme} />
          <p className="text-xs opacity-50">Jobs shown here come live from Admin → Careers.</p>
        </div>
      );
    }
    case "contactPanel": {
      const data = block.data as ContactPanelData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Heading" name="heading" defaultValue={data.heading} required />
          <TextAreaField label="Body — optional" name="body" defaultValue={data.body} rows={2} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email" name="email" defaultValue={data.email} required />
            <Field label="Location" name="location" defaultValue={data.location} required />
          </div>
          <ThemeField defaultValue={data.theme} />
          <p className="text-xs opacity-50">The contact form itself is always shown next to this.</p>
        </div>
      );
    }
    case "productsGrid": {
      const data = block.data as ProductsGridData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Heading" name="heading" defaultValue={data.heading} required />
          <TextAreaField label="Body — optional" name="body" defaultValue={data.body} rows={2} />
          <Field label="Empty-state message" name="emptyMessage" defaultValue={data.emptyMessage} />
          <ThemeField defaultValue={data.theme} />
          <p className="text-xs opacity-50">Products shown here come live from Admin → Products.</p>
        </div>
      );
    }
    default:
      return null;
  }
}
