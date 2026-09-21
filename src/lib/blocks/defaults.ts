import { EMPTY_RICH_DOC, type BlockDataMap, type BlockType } from "./types";

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
  }
}
