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
  type HeroSideListItem,
  type IndustriesShowcaseData,
  type IndustriesShowcaseItem,
  type OpenPositionsData,
  type PartnersTrustBarData,
  type ProductsGridData,
  type ProductsPreviewData,
  type QuoteData,
  type RichTextData,
  type SectionData,
  type StatItem,
  type StatsBarData,
  type StatsBarItem,
  type StatsQuoteData,
  type TechStackData,
  type TechStackItem,
} from "@/lib/blocks/types";
import { TECH_ICON_KEYS, TECH_ICON_LABELS } from "@/lib/techIcons";
import { SectionEditor } from "./SectionEditor";
import { Field, TextAreaField, ThemeField, inputClass, inputStyle, labelClass } from "./formFields";

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

function HeroSideListEditor({ defaultItems }: { defaultItems: HeroSideListItem[] }) {
  const [items, setItems] = useState<HeroSideListItem[]>(
    defaultItems.length > 0 ? defaultItems : [{ title: "" }],
  );

  function update(i: number, patch: Partial<HeroSideListItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <label className={labelClass} style={{ color: "var(--ink)" }}>
        Floating list beside the image — optional
      </label>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border p-3" style={{ borderColor: "var(--border-soft)" }}>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Title — e.g. Web Development"
                value={item.title}
                onChange={(e) => update(i, { title: e.target.value })}
                className={inputClass}
                style={inputStyle}
              />
              <select
                value={item.icon ?? ""}
                onChange={(e) => update(i, { icon: (e.target.value || undefined) as HeroSideListItem["icon"] })}
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
              placeholder="Subtitle — optional"
              value={item.subtitle ?? ""}
              onChange={(e) => update(i, { subtitle: e.target.value || undefined })}
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
        onClick={() => setItems((prev) => [...prev, { title: "" }])}
        className="mt-3 text-sm font-medium"
        style={{ color: "var(--color-teal)" }}
      >
        + Add item
      </button>
      <input type="hidden" name="sideListJson" value={JSON.stringify(items)} readOnly />
    </div>
  );
}

function IndustriesShowcaseItemsEditor({ defaultItems }: { defaultItems: IndustriesShowcaseItem[] }) {
  const [items, setItems] = useState<IndustriesShowcaseItem[]>(
    defaultItems.length > 0 ? defaultItems : [{ label: "" }],
  );

  function update(i: number, patch: Partial<IndustriesShowcaseItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <label className={labelClass} style={{ color: "var(--ink)" }}>
        Industries
      </label>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <select
              value={item.icon ?? ""}
              onChange={(e) => update(i, { icon: (e.target.value || undefined) as IndustriesShowcaseItem["icon"] })}
              className={inputClass}
              style={{ ...inputStyle, maxWidth: "10rem" }}
            >
              <option value="">No icon</option>
              {ICON_KEYS.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            <input
              placeholder="Label — e.g. Healthcare"
              value={item.label}
              onChange={(e) => update(i, { label: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
              disabled={items.length <= 1}
              className="shrink-0 text-xs font-medium disabled:opacity-30"
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
        className="mt-2 text-sm font-medium"
        style={{ color: "var(--color-teal)" }}
      >
        + Add industry
      </button>
      <input type="hidden" name="itemsJson" value={JSON.stringify(items)} readOnly />
    </div>
  );
}

function TechStackEditor({ defaultItems }: { defaultItems: TechStackItem[] }) {
  const [items, setItems] = useState<TechStackItem[]>(
    defaultItems.length > 0 ? defaultItems : [{ icon: "react", label: "React" }],
  );

  function update(i: number, patch: Partial<TechStackItem>) {
    setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <label className={labelClass} style={{ color: "var(--ink)" }}>
        Technologies
      </label>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <select
              value={item.icon}
              onChange={(e) => {
                const icon = e.target.value as TechStackItem["icon"];
                update(i, { icon, label: item.label || TECH_ICON_LABELS[icon] });
              }}
              className={inputClass}
              style={{ ...inputStyle, maxWidth: "12rem" }}
            >
              {TECH_ICON_KEYS.map((key) => (
                <option key={key} value={key}>
                  {TECH_ICON_LABELS[key]}
                </option>
              ))}
            </select>
            <input
              placeholder="Label"
              value={item.label}
              onChange={(e) => update(i, { label: e.target.value })}
              className={inputClass}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
              disabled={items.length <= 1}
              className="shrink-0 text-xs font-medium disabled:opacity-30"
              style={{ color: "var(--color-ember)" }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems((prev) => [...prev, { icon: "javascript", label: TECH_ICON_LABELS.javascript }])}
        className="mt-2 text-sm font-medium"
        style={{ color: "var(--color-teal)" }}
      >
        + Add technology
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
          <div className="rounded-lg border p-4" style={{ borderColor: "var(--border-soft)" }}>
            <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
              Or: device mockup image
            </p>
            <p className="mt-1 text-xs opacity-60">
              An alternative to the 3D logo above — if both are set, the 3D logo wins. Paste a
              path under <code>public/</code> (e.g. <code>/hero-dashboard-mockup.webp</code>) or a
              full image URL.
            </p>
            <div className="mt-3">
              <Field label="Image" name="mockupImage" defaultValue={data.mockupImage} placeholder="/hero-dashboard-mockup.webp" />
            </div>
            <div className="mt-4">
              <HeroSideListEditor defaultItems={data.sideList ?? []} />
            </div>
          </div>
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
          <div className="rounded-lg border p-4" style={{ borderColor: "var(--border-soft)" }}>
            <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
              Optional photo — optional
            </p>
            <p className="mt-1 text-xs opacity-60">
              Shows the text beside a photo instead of centered alone. Paste a path under{" "}
              <code>public/</code> or a full image URL.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <Field label="Image" name="imageUrl" defaultValue={data.imageUrl} placeholder="/mead-food-industry.webp" />
              <div>
                <label htmlFor="imagePosition" className={labelClass} style={{ color: "var(--ink)" }}>
                  Image side
                </label>
                <select
                  id="imagePosition"
                  name="imagePosition"
                  defaultValue={data.imagePosition ?? "left"}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="imageFit" className={labelClass} style={{ color: "var(--ink)" }}>
                Image fit
              </label>
              <select
                id="imageFit"
                name="imageFit"
                defaultValue={data.imageFit ?? "cover"}
                className={inputClass}
                style={inputStyle}
              >
                <option value="cover">Crop to fill (a photo)</option>
                <option value="contain">Show whole image (a wide UI mockup/screenshot)</option>
              </select>
            </div>
          </div>
        </div>
      );
    }
    case "cardGrid": {
      const data = block.data as CardGridData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Heading — optional" name="heading" defaultValue={data.heading} />
            <Field
              label="Heading highlight (accent color) — optional"
              name="headingHighlight"
              defaultValue={data.headingHighlight}
            />
          </div>
          <TextAreaField label="Intro text — optional" name="body" defaultValue={data.body} rows={2} />
          <ItemsEditor defaultItems={data.items} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="layout" className={labelClass} style={{ color: "var(--ink)" }}>
                Layout
              </label>
              <select
                id="layout"
                name="layout"
                defaultValue={data.layout ?? "grid"}
                className={inputClass}
                style={inputStyle}
              >
                <option value="grid">Full-width heading + row of cards</option>
                <option value="split">Text column beside a compact card grid</option>
              </select>
            </div>
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
          </div>
          {data.layout === "split" && (
            <div>
              <label htmlFor="cardStyle" className={labelClass} style={{ color: "var(--ink)" }}>
                Card style
              </label>
              <select
                id="cardStyle"
                name="cardStyle"
                defaultValue={data.cardStyle ?? "bordered"}
                className={inputClass}
                style={inputStyle}
              >
                <option value="bordered">Bordered card with icon badge</option>
                <option value="tinted">Borderless, color-washed card with a plain icon</option>
                <option value="plain">No card — round icon badge beside its label (for use with a photo)</option>
              </select>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Anchor id — optional" name="anchorId" defaultValue={data.anchorId} placeholder="solutions" />
            <ThemeField defaultValue={data.theme} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="'View all' link label — optional" name="viewAllLabel" defaultValue={data.viewAllLabel} placeholder="View All Services" />
            <Field label="'View all' link href — optional" name="viewAllHref" defaultValue={data.viewAllHref} placeholder="/services" />
          </div>
          {data.layout === "split" && (
            <div className="rounded-lg border p-4" style={{ borderColor: "var(--border-soft)" }}>
              <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                Optional photo — optional
              </p>
              <p className="mt-1 text-xs opacity-60">
                Replaces the text column with a photo, stacking the text and cards together in
                the other column. Paste a path under <code>public/</code> or a full image URL.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <Field label="Image" name="imageUrl" defaultValue={data.imageUrl} placeholder="/yeneta-classroom.webp" />
                <div>
                  <label htmlFor="imagePosition" className={labelClass} style={{ color: "var(--ink)" }}>
                    Image side
                  </label>
                  <select
                    id="imagePosition"
                    name="imagePosition"
                    defaultValue={data.imagePosition ?? "left"}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="imageFit" className={labelClass} style={{ color: "var(--ink)" }}>
                  Image fit
                </label>
                <select
                  id="imageFit"
                  name="imageFit"
                  defaultValue={data.imageFit ?? "cover"}
                  className={inputClass}
                  style={inputStyle}
                >
                  <option value="cover">Crop to fill (a photo)</option>
                  <option value="contain">Show whole image (a wide UI mockup/screenshot)</option>
                </select>
              </div>
              <p className="mt-4 text-sm font-medium" style={{ color: "var(--ink)" }}>
                Caption card over the photo — optional
              </p>
              <div className="mt-2 grid grid-cols-3 gap-3">
                <select
                  name="captionIcon"
                  defaultValue={data.imageCaption?.icon ?? ""}
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
                <Field label="Title" name="captionTitle" defaultValue={data.imageCaption?.title} placeholder="Empowering educators." />
                <Field label="Subtitle" name="captionSubtitle" defaultValue={data.imageCaption?.subtitle} placeholder="Inspiring students." />
              </div>
            </div>
          )}
        </div>
      );
    }
    case "industriesShowcase": {
      const data = block.data as IndustriesShowcaseData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Heading" name="heading" defaultValue={data.heading} required />
          <TextAreaField label="Intro text — optional" name="body" defaultValue={data.body} rows={2} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Button label — optional" name="buttonLabel" defaultValue={data.buttonLabel} />
            <Field label="Button link — optional" name="buttonHref" defaultValue={data.buttonHref} />
          </div>
          <IndustriesShowcaseItemsEditor defaultItems={data.items} />
          <div className="rounded-lg border p-4" style={{ borderColor: "var(--border-soft)" }}>
            <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
              Photo card
            </p>
            <p className="mt-1 text-xs opacity-60">
              Paste a path under <code>public/</code> (e.g. <code>/addis-ababa-park-sunset.webp</code>) or a full
              image URL.
            </p>
            <div className="mt-3 flex flex-col gap-3">
              <Field label="Image" name="photoUrl" defaultValue={data.photoUrl} placeholder="/addis-ababa-park-sunset.webp" />
              <Field
                label="Overlay heading — optional"
                name="photoHeading"
                defaultValue={data.photoHeading}
                placeholder="Built for Ethiopia, Ready for the World"
              />
            </div>
          </div>
          <ThemeField defaultValue={data.theme} />
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
          <div className="grid grid-cols-2 gap-4">
            <Field label="Second button label — optional" name="secondaryLabel" defaultValue={data.secondaryLabel} />
            <Field label="Second button link — optional" name="secondaryHref" defaultValue={data.secondaryHref} />
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
          <ThemeField defaultValue={data.theme} />
          <p className="text-xs opacity-50">
            The contact form, plus office location, phone, email, map, and social links, are
            always shown next to this — edit those at Admin → Settings.
          </p>
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
    case "section":
      return <SectionEditor data={block.data as SectionData} />;
    case "techStack": {
      const data = block.data as TechStackData;
      return (
        <div className="flex flex-col gap-4">
          <Field label="Eyebrow — optional" name="eyebrow" defaultValue={data.eyebrow} />
          <Field label="Heading — optional" name="heading" defaultValue={data.heading} />
          <TextAreaField label="Intro text — optional" name="body" defaultValue={data.body} rows={2} />
          <TechStackEditor defaultItems={data.items} />
          <ThemeField defaultValue={data.theme} />
        </div>
      );
    }
    default:
      return null;
  }
}
