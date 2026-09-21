import { EMPTY_RICH_DOC, emptyMediaRef, type BlockDataMap, type BlockType, type SectionElement, type SectionElementDataMap, type SectionElementType } from "./types";

// A fresh, stable-enough id for a new section element or media ref — good
// enough for React keys and for naming that ref's upload <input>; never
// needs to be globally unique across requests, only within one page's edits.
export function newElementId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `el_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function defaultElementData<T extends SectionElementType>(type: T): SectionElementDataMap[T] {
  switch (type) {
    case "heading":
      return { level: 2, text: "New heading", align: "left" } satisfies SectionElementDataMap["heading"] as SectionElementDataMap[T];
    case "paragraph":
      return { text: "" } satisfies SectionElementDataMap["paragraph"] as SectionElementDataMap[T];
    case "list":
      return { style: "bullet", items: ["First item"] } satisfies SectionElementDataMap["list"] as SectionElementDataMap[T];
    case "quote":
      return { text: "A short quotation." } satisfies SectionElementDataMap["quote"] as SectionElementDataMap[T];
    case "pullquote":
      return { text: "A short excerpt." } satisfies SectionElementDataMap["pullquote"] as SectionElementDataMap[T];
    case "code":
      return { code: "" } satisfies SectionElementDataMap["code"] as SectionElementDataMap[T];
    case "preformatted":
      return { text: "" } satisfies SectionElementDataMap["preformatted"] as SectionElementDataMap[T];
    case "details":
      return { summary: "Summary", body: "" } satisfies SectionElementDataMap["details"] as SectionElementDataMap[T];
    case "table":
      return {
        headers: ["Column 1", "Column 2"],
        rows: [["", ""]],
      } satisfies SectionElementDataMap["table"] as SectionElementDataMap[T];
    case "image":
      return { image: emptyMediaRef(newElementId()) } satisfies SectionElementDataMap["image"] as SectionElementDataMap[T];
    case "gallery":
      return { images: [emptyMediaRef(newElementId())] } satisfies SectionElementDataMap["gallery"] as SectionElementDataMap[T];
    case "video":
      return { url: "" } satisfies SectionElementDataMap["video"] as SectionElementDataMap[T];
    case "audio":
      return { url: "" } satisfies SectionElementDataMap["audio"] as SectionElementDataMap[T];
    case "file":
      return { url: "", label: "Download" } satisfies SectionElementDataMap["file"] as SectionElementDataMap[T];
    case "cover":
      return { image: emptyMediaRef(newElementId()), heading: "" } satisfies SectionElementDataMap["cover"] as SectionElementDataMap[T];
    case "mediaText":
      return {
        image: emptyMediaRef(newElementId()),
        heading: "",
        body: "",
        mediaPosition: "left",
      } satisfies SectionElementDataMap["mediaText"] as SectionElementDataMap[T];
    case "icon":
      return { icon: "sparkles" } satisfies SectionElementDataMap["icon"] as SectionElementDataMap[T];
    case "buttons":
      return { buttons: [{ label: "Learn more", href: "#", style: "primary" }] } satisfies SectionElementDataMap["buttons"] as SectionElementDataMap[T];
    case "columns":
      return { columns: [[], []] as SectionElement[][] } satisfies SectionElementDataMap["columns"] as SectionElementDataMap[T];
    case "separator":
      return {} satisfies SectionElementDataMap["separator"] as SectionElementDataMap[T];
    case "spacer":
      return { height: "md" } satisfies SectionElementDataMap["spacer"] as SectionElementDataMap[T];
    case "embed":
      return { url: "" } satisfies SectionElementDataMap["embed"] as SectionElementDataMap[T];
  }
}

export function newElement<T extends SectionElementType>(type: T): Extract<SectionElement, { type: T }> {
  return { id: newElementId(), type, data: defaultElementData(type) } as unknown as Extract<SectionElement, { type: T }>;
}

export function defaultBlockData<T extends BlockType>(type: T): BlockDataMap[T] {
  switch (type) {
    case "hero":
      return {
        eyebrow: "",
        headline: "New headline",
        subhead: "",
        theme: "dark",
        align: "left",
      } satisfies BlockDataMap["hero"] as BlockDataMap[T];
    case "richText":
      return {
        eyebrow: "",
        heading: "",
        body: EMPTY_RICH_DOC,
        theme: "light",
      } satisfies BlockDataMap["richText"] as BlockDataMap[T];
    case "cardGrid":
      return {
        eyebrow: "",
        heading: "New section",
        body: "",
        items: [{ title: "First item", description: "" }],
        theme: "light",
        columns: 3,
      } satisfies BlockDataMap["cardGrid"] as BlockDataMap[T];
    case "statsBar":
      return {
        items: [{ label: "New stat" }],
        theme: "light",
      } satisfies BlockDataMap["statsBar"] as BlockDataMap[T];
    case "statsQuote":
      return {
        eyebrow: "",
        heading: "New section",
        body: "",
        stats: [{ number: "01", label: "Label" }],
        quote: "A short pull-quote.",
        theme: "light",
      } satisfies BlockDataMap["statsQuote"] as BlockDataMap[T];
    case "quote":
      return {
        eyebrow: "",
        lines: ["A short statement."],
        highlight: "",
        theme: "dark",
      } satisfies BlockDataMap["quote"] as BlockDataMap[T];
    case "cta":
      return {
        eyebrow: "",
        heading: "Have an idea worth building?",
        body: "",
        buttonLabel: "Talk to us",
        buttonHref: "/contact",
        theme: "dark",
      } satisfies BlockDataMap["cta"] as BlockDataMap[T];
    case "productsPreview":
      return {
        eyebrow: "",
        heading: "What we're building",
        viewAllLabel: "View all",
        limit: 3,
        theme: "light",
      } satisfies BlockDataMap["productsPreview"] as BlockDataMap[T];
    case "partnersTrustBar":
      return {
        eyebrow: "Trusted by",
        theme: "dark",
      } satisfies BlockDataMap["partnersTrustBar"] as BlockDataMap[T];
    case "openPositions":
      return {
        eyebrow: "",
        heading: "Open positions",
        theme: "light",
      } satisfies BlockDataMap["openPositions"] as BlockDataMap[T];
    case "contactPanel":
      return {
        eyebrow: "Get in touch",
        heading: "Let's build something new.",
        body: "",
        email: "hello@paraiba.com",
        location: "Addis Ababa, Ethiopia",
        theme: "light",
      } satisfies BlockDataMap["contactPanel"] as BlockDataMap[T];
    case "productsGrid":
      return {
        eyebrow: "Portfolio",
        heading: "Products",
        body: "",
        emptyMessage: "No products published yet — we're currently building.",
        theme: "light",
      } satisfies BlockDataMap["productsGrid"] as BlockDataMap[T];
    case "section":
      return { theme: "light", elements: [] as SectionElement[] } satisfies BlockDataMap["section"] as BlockDataMap[T];
  }
}
