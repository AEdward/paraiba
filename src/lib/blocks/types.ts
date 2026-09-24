// Client-safe: type definitions + pure lookups only, no database import.
// Used by both the admin builder (to know what fields exist) and the public
// site's block-rendering components (to know what to read from `data`).

import {
  Briefcase,
  Cloud,
  Compass,
  Cpu,
  Gem,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { TechIconKey } from "@/lib/techIcons";

export type SectionTheme = "dark" | "light";

export const ICONS = {
  rocket: Rocket,
  compass: Compass,
  briefcase: Briefcase,
  cloud: Cloud,
  cpu: Cpu,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
  shieldCheck: ShieldCheck,
  gem: Gem,
  target: Target,
  star: Star,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof ICONS;
export const ICON_KEYS = Object.keys(ICONS) as IconKey[];

// A generic TipTap JSON document — same shape already used by Project
// deliverables/case study (see lib/richDoc.ts).
export type RichDoc = { type: "doc"; content?: unknown[] };

export const EMPTY_RICH_DOC: RichDoc = { type: "doc", content: [{ type: "paragraph" }] };

export type HeroData = {
  eyebrow?: string;
  headline: string;
  // Optional trailing text rendered in the brand gradient (dark theme only) —
  // e.g. headline "Technology with " + headlineHighlight "Brilliance."
  headlineHighlight?: string;
  subhead?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  theme: SectionTheme;
  align: "left" | "center";
  showLogo3D?: boolean;
};

export type RichTextData = {
  eyebrow?: string;
  heading?: string;
  body: RichDoc;
  theme: SectionTheme;
  tint?: boolean; // subtle brand-color wash background, used on a couple of Home sections
};

export type CardGridItem = {
  icon?: IconKey;
  number?: string;
  label?: string;
  title: string;
  description?: string;
};

export type CardGridData = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  items: CardGridItem[];
  theme: SectionTheme;
  columns: 2 | 3;
  // Lets another block's link (e.g. a hero "Explore Solutions" button) scroll
  // straight to this section via "#<anchorId>".
  anchorId?: string;
  // Optional link shown next to the heading, e.g. "View All Services →".
  viewAllLabel?: string;
  viewAllHref?: string;
};

export type StatItem = { number: string; label: string };

export type StatsBarItem = { icon?: IconKey; label: string; sublabel?: string };

export type StatsBarData = {
  items: StatsBarItem[];
  theme: SectionTheme;
};

export type StatsQuoteData = {
  eyebrow?: string;
  heading: string;
  body?: string;
  stats: StatItem[];
  quote: string;
  theme: SectionTheme;
};

export type QuoteData = {
  eyebrow?: string;
  // A lighter, non-bold line shown above the main statement.
  intro?: string;
  lines: string[];
  highlight?: string;
  theme: SectionTheme;
};

export type CtaData = {
  eyebrow?: string;
  heading: string;
  body?: string;
  buttonLabel: string;
  buttonHref: string;
  theme: SectionTheme;
};

export type ProductsPreviewData = {
  eyebrow?: string;
  heading: string;
  viewAllLabel?: string;
  limit: number;
  theme: SectionTheme;
};

export type PartnersTrustBarData = {
  eyebrow?: string;
  theme: SectionTheme;
};

export type OpenPositionsData = {
  eyebrow?: string;
  heading: string;
  theme: SectionTheme;
};

// Email/location/phone/map come from the site-wide SiteSettings row
// (edited at /admin/settings), not from this block — one place to edit
// contact details that's shared between the Contact page and the Footer.
export type ContactPanelData = {
  eyebrow?: string;
  heading: string;
  body?: string;
  theme: SectionTheme;
};

export type ProductsGridData = {
  eyebrow?: string;
  heading: string;
  body?: string;
  emptyMessage?: string;
  theme: SectionTheme;
};

// Real per-technology brand logos (see lib/techIcons.ts) — distinct from
// IconKey above, which is the generic abstract-glyph set used by
// cardGrid/statsBar/icon.
export type TechStackItem = { icon: TechIconKey; label: string };

export type TechStackData = {
  eyebrow?: string;
  heading?: string;
  body?: string;
  items: TechStackItem[];
  theme: SectionTheme;
};

// A reference to an image — either one uploaded directly (served from
// MediaAsset via /api/media/[assetId]) or a pasted external URL. Carries its
// own stable `id` (independent of any enclosing element's id) so an admin
// upload form can target it with a same-named <input type="file"> even when
// several images live in one element (e.g. a gallery).
export type MediaRef = { id: string; assetId?: string; url?: string; alt?: string };

export function emptyMediaRef(id: string): MediaRef {
  return { id };
}

// ---- Freeform section elements -------------------------------------------
// A "section" block (below) is a container an admin fills with an ordered
// list of these — the WordPress/Strapi-style building blocks, as opposed to
// the fixed-shape presets above (cardGrid, statsBar, etc.), which stay
// available as one-click starting points that simply insert a pre-filled
// section.

export type HeadingElementData = { level: 1 | 2 | 3 | 4 | 5 | 6; text: string; align: "left" | "center" };
export type ParagraphElementData = { text: string };
export type ListElementData = { style: "bullet" | "number"; items: string[] };
export type QuoteElementData = { text: string; citation?: string };
export type PullquoteElementData = { text: string; citation?: string };
export type CodeElementData = { code: string; language?: string };
export type PreformattedElementData = { text: string };
export type DetailsElementData = { summary: string; body: string };
export type TableElementData = { headers: string[]; rows: string[][] };

export type ImageElementData = { image: MediaRef; caption?: string };
export type GalleryElementData = { images: MediaRef[] };
export type VideoElementData = { url: string; caption?: string };
export type AudioElementData = { url: string; caption?: string };
export type FileElementData = { url: string; label: string };
export type CoverElementData = {
  image: MediaRef;
  heading?: string;
  body?: string;
  buttonLabel?: string;
  buttonHref?: string;
};
export type MediaTextElementData = {
  image: MediaRef;
  heading?: string;
  body?: string;
  mediaPosition: "left" | "right";
};
export type IconElementData = { icon: IconKey; label?: string };

export type ButtonItem = { label: string; href: string; style: "primary" | "secondary" };
export type ButtonsElementData = { buttons: ButtonItem[] };
export type ColumnsElementData = { columns: SectionElement[][] };
export type SeparatorElementData = Record<string, never>;
export type SpacerElementData = { height: "sm" | "md" | "lg" };

export type EmbedElementData = { url: string; caption?: string };

export type SectionElementDataMap = {
  heading: HeadingElementData;
  paragraph: ParagraphElementData;
  list: ListElementData;
  quote: QuoteElementData;
  pullquote: PullquoteElementData;
  code: CodeElementData;
  preformatted: PreformattedElementData;
  details: DetailsElementData;
  table: TableElementData;
  image: ImageElementData;
  gallery: GalleryElementData;
  video: VideoElementData;
  audio: AudioElementData;
  file: FileElementData;
  cover: CoverElementData;
  mediaText: MediaTextElementData;
  icon: IconElementData;
  buttons: ButtonsElementData;
  columns: ColumnsElementData;
  separator: SeparatorElementData;
  spacer: SpacerElementData;
  embed: EmbedElementData;
};

export type SectionElementType = keyof SectionElementDataMap;

// A proper discriminated union (not a single generic type defaulted to the
// whole SectionElementType union) so `switch (element.type)` narrows
// `element.data` to that one variant's shape everywhere it's consumed.
export type SectionElement = {
  [K in SectionElementType]: { id: string; type: K; data: SectionElementDataMap[K] };
}[SectionElementType];

export const SECTION_ELEMENT_CATEGORIES = [
  {
    label: "Text",
    types: [
      "heading",
      "paragraph",
      "list",
      "quote",
      "pullquote",
      "code",
      "preformatted",
      "details",
      "table",
    ],
  },
  {
    label: "Media",
    types: ["image", "gallery", "video", "audio", "file", "cover", "mediaText", "icon"],
  },
  {
    label: "Design",
    types: ["buttons", "columns", "separator", "spacer"],
  },
  {
    label: "Embed",
    types: ["embed"],
  },
] as const satisfies readonly { label: string; types: readonly SectionElementType[] }[];

export const SECTION_ELEMENT_LABELS: Record<SectionElementType, string> = {
  heading: "Heading",
  paragraph: "Paragraph",
  list: "List",
  quote: "Quote",
  pullquote: "Pullquote",
  code: "Code",
  preformatted: "Preformatted",
  details: "Details",
  table: "Table",
  image: "Image",
  gallery: "Gallery",
  video: "Video",
  audio: "Audio",
  file: "File",
  cover: "Cover",
  mediaText: "Media & Text",
  icon: "Icon",
  buttons: "Buttons",
  columns: "Columns",
  separator: "Separator",
  spacer: "Spacer",
  embed: "Embed",
};

export const SECTION_ELEMENT_DESCRIPTIONS: Record<SectionElementType, string> = {
  heading: "A section title, H1 through H6.",
  paragraph: "Standard body text.",
  list: "Bulleted or numbered items.",
  quote: "A styled quotation with an optional citation.",
  pullquote: "A short excerpt called out visually.",
  code: "A code snippet in a fixed-width font.",
  preformatted: "Text with spacing and line breaks preserved exactly.",
  details: "A collapsible summary/disclosure.",
  table: "A structured grid of rows and columns.",
  image: "A standalone picture, uploaded or linked.",
  gallery: "Multiple images in a grid.",
  video: "An embedded or linked video.",
  audio: "A playable audio clip.",
  file: "A link to a downloadable file like a PDF.",
  cover: "Text and a button over an image background.",
  mediaText: "An image side-by-side with text.",
  icon: "A single vector icon, optionally labeled.",
  buttons: "One or more call-to-action buttons.",
  columns: "Splits into 2–3 side-by-side columns, each with its own elements.",
  separator: "A dividing line.",
  spacer: "Custom vertical whitespace.",
  embed: "Paste a link from YouTube, Twitter/X, Instagram, Spotify, and more.",
};

export type SectionData = {
  theme: SectionTheme;
  elements: SectionElement[];
};

export type BlockDataMap = {
  hero: HeroData;
  richText: RichTextData;
  cardGrid: CardGridData;
  statsBar: StatsBarData;
  statsQuote: StatsQuoteData;
  quote: QuoteData;
  cta: CtaData;
  productsPreview: ProductsPreviewData;
  partnersTrustBar: PartnersTrustBarData;
  openPositions: OpenPositionsData;
  contactPanel: ContactPanelData;
  productsGrid: ProductsGridData;
  section: SectionData;
  techStack: TechStackData;
};

export type BlockType = keyof BlockDataMap;

export const BLOCK_TYPES = [
  "hero",
  "richText",
  "cardGrid",
  "statsBar",
  "statsQuote",
  "quote",
  "cta",
  "productsPreview",
  "partnersTrustBar",
  "openPositions",
  "contactPanel",
  "productsGrid",
  "section",
  "techStack",
] as const satisfies readonly BlockType[];

// The subset that makes sense on a standalone product site — the others
// (productsPreview, partnersTrustBar, openPositions, productsGrid) all pull
// Paraiba-corporate-specific data (its product catalog, its partners, its
// job postings), which has no meaning on an independent product's own site.
export const MICROSITE_BLOCK_TYPES = [
  "hero",
  "richText",
  "cardGrid",
  "statsBar",
  "statsQuote",
  "quote",
  "cta",
  "contactPanel",
  "section",
] as const satisfies readonly BlockType[];

export const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  richText: "Rich text",
  cardGrid: "Card grid",
  statsBar: "Stats strip",
  statsQuote: "Stats + quote",
  quote: "Statement / quote",
  cta: "Call to action",
  productsPreview: "Products preview (live)",
  partnersTrustBar: "Partners trust bar (live)",
  openPositions: "Open positions (live)",
  contactPanel: "Contact info + form",
  productsGrid: "Products grid (live)",
  section: "Section (build your own)",
  techStack: "Tech stack",
};

export const BLOCK_DESCRIPTIONS: Record<BlockType, string> = {
  hero: "Big headline section, usually at the top of a page.",
  richText: "Eyebrow, heading, and formatted body copy.",
  cardGrid: "A heading plus a row of cards (used for solutions, perks, values…).",
  statsBar: "A row of small stats or trust signals, each with an icon and label.",
  statsQuote: "A stat grid paired with a pull-quote card, side by side.",
  quote: "A short standalone statement, optionally with a highlighted line.",
  cta: "A boxed call-to-action with a button.",
  productsPreview: "Shows the latest products automatically — no manual content.",
  partnersTrustBar: "Shows the partner logo marquee automatically.",
  openPositions: "Shows open job postings automatically.",
  contactPanel: "Contact details next to the live contact form.",
  productsGrid: "The full products listing, including the featured showcase.",
  section: "A blank container — add text, image, video, gallery, and other elements freely.",
  techStack: "A grid of programming languages, frameworks, and tools, each with its real logo.",
};

// A generic block row shape both the DB layer and the renderer agree on —
// intentionally shaped to fit both Block (site pages) and ProductBlock
// (product mini-site pages) rows.
export type BlockRecord<T extends BlockType = BlockType> = {
  id: string;
  type: T;
  order: number;
  data: BlockDataMap[T];
};

export const PAGE_SLUGS = [
  "home",
  "about",
  "careers",
  "contact",
  "products",
  "solutions",
  "services",
  "work",
  "resources",
  "team",
] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];

export const PAGE_TITLES: Record<PageSlug, string> = {
  home: "Home",
  about: "About",
  careers: "Careers",
  contact: "Contact",
  products: "Products",
  solutions: "Solutions",
  services: "Services",
  work: "Work",
  resources: "Resources",
  team: "Team",
};

// A product's own site is a single scrolling page — no separate
// Features/Pricing/About/Contact routes. Kept as a one-item tuple (rather
// than a plain string) so ProductPage/ProductBlock's existing slug-based
// storage doesn't need a schema change.
export const PRODUCT_PAGE_SLUGS = ["home"] as const;
export type ProductPageSlug = (typeof PRODUCT_PAGE_SLUGS)[number];

export const PRODUCT_PAGE_TITLES: Record<ProductPageSlug, string> = {
  home: "Home",
};
