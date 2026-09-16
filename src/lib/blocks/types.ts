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
};

export type StatItem = { number: string; label: string };

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

export type ContactPanelData = {
  eyebrow?: string;
  heading: string;
  body?: string;
  email: string;
  location: string;
  theme: SectionTheme;
};

export type ProductsGridData = {
  eyebrow?: string;
  heading: string;
  body?: string;
  emptyMessage?: string;
  theme: SectionTheme;
};

export type BlockDataMap = {
  hero: HeroData;
  richText: RichTextData;
  cardGrid: CardGridData;
  statsQuote: StatsQuoteData;
  quote: QuoteData;
  cta: CtaData;
  productsPreview: ProductsPreviewData;
  partnersTrustBar: PartnersTrustBarData;
  openPositions: OpenPositionsData;
  contactPanel: ContactPanelData;
  productsGrid: ProductsGridData;
};

export type BlockType = keyof BlockDataMap;

export const BLOCK_TYPES = [
  "hero",
  "richText",
  "cardGrid",
  "statsQuote",
  "quote",
  "cta",
  "productsPreview",
  "partnersTrustBar",
  "openPositions",
  "contactPanel",
  "productsGrid",
] as const satisfies readonly BlockType[];

export const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  richText: "Rich text",
  cardGrid: "Card grid",
  statsQuote: "Stats + quote",
  quote: "Statement / quote",
  cta: "Call to action",
  productsPreview: "Products preview (live)",
  partnersTrustBar: "Partners trust bar (live)",
  openPositions: "Open positions (live)",
  contactPanel: "Contact info + form",
  productsGrid: "Products grid (live)",
};

export const BLOCK_DESCRIPTIONS: Record<BlockType, string> = {
  hero: "Big headline section, usually at the top of a page.",
  richText: "Eyebrow, heading, and formatted body copy.",
  cardGrid: "A heading plus a row of cards (used for solutions, perks, values…).",
  statsQuote: "A stat grid paired with a pull-quote card, side by side.",
  quote: "A short standalone statement, optionally with a highlighted line.",
  cta: "A boxed call-to-action with a button.",
  productsPreview: "Shows the latest products automatically — no manual content.",
  partnersTrustBar: "Shows the partner logo marquee automatically.",
  openPositions: "Shows open job postings automatically.",
  contactPanel: "Contact details next to the live contact form.",
  productsGrid: "The full products listing, including the featured showcase.",
};

// A generic block row shape both the DB layer and the renderer agree on.
export type BlockRecord<T extends BlockType = BlockType> = {
  id: string;
  pageId: string;
  type: T;
  order: number;
  data: BlockDataMap[T];
};

export const PAGE_SLUGS = ["home", "about", "careers", "contact", "products"] as const;
export type PageSlug = (typeof PAGE_SLUGS)[number];

export const PAGE_TITLES: Record<PageSlug, string> = {
  home: "Home",
  about: "About",
  careers: "Careers",
  contact: "Contact",
  products: "Products",
};
