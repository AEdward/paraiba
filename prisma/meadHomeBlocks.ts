// Mead's home-page content below its bespoke hero, following the same
// pattern as Kinin/Yeneta/Tena. Seeded once via republishMeadHome.ts, then
// editable from /admin/product-sites/[id]/pages/home like any other block.

import type { BlockDataMap, BlockType, RichDoc } from "../src/lib/blocks/types";

export type SeedBlock<T extends BlockType = BlockType> = { type: T; data: BlockDataMap[T] };

function block<T extends BlockType>(type: T, data: BlockDataMap[T]): SeedBlock<T> {
  return { type, data };
}

const industryDoc: RichDoc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Mead is built around how restaurants, cafés, and food businesses actually run day to day — taking orders, tracking inventory, and managing staff, all in one place. It's designed to be simple enough for any team member to pick up, and reliable enough to run a busy service on.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        "Easy-to-use and intuitive interface",
        "Works online and offline",
        "Secure and reliable",
        "Dedicated support and training",
      ].map((item) => ({
        type: "listItem",
        content: [{ type: "paragraph", content: [{ type: "text", text: item }] }],
      })),
    },
  ],
};

export const meadHomeBlocks: SeedBlock[] = [
  block("statsBar", {
    theme: "light",
    items: [
      { icon: "briefcase", label: "Manage Orders & Tables" },
      { icon: "cloud", label: "Track Inventory", sublabel: "In real-time" },
      { icon: "compass", label: "Handle Staff & Shifts" },
      { icon: "sparkles", label: "Get Detailed Reports" },
    ],
  }),
  block("cardGrid", {
    eyebrow: "Key Features",
    heading: "Everything You Need to Run a Successful Restaurant",
    body: "Mead gives you the tools to streamline your operations, improve customer experience, and increase your profits. Designed for restaurants, cafés, bars, and food businesses of all sizes.",
    theme: "light",
    columns: 3,
    anchorId: "features",
    viewAllLabel: "Explore All Features",
    viewAllHref: "#features",
    items: [
      { icon: "zap", title: "POS & Order Management", description: "Take orders, manage tables, and serve faster." },
      { icon: "cloud", title: "Inventory Management", description: "Track stock, reduce waste, and never run out." },
      { icon: "briefcase", title: "Staff Management", description: "Schedule shifts, track performance, and manage your team." },
      { icon: "compass", title: "Table Management", description: "Optimize seating and improve table turnover." },
      { icon: "sparkles", title: "Reporting & Analytics", description: "Get real-time insights and make better decisions." },
      { icon: "target", title: "Multi-Branch Support", description: "Manage multiple locations from one dashboard." },
    ],
  }),
  block("richText", {
    eyebrow: "Built for the Food Industry",
    heading: "A Smarter Way to Manage Your Restaurant",
    body: industryDoc,
    theme: "dark",
  }),
  block("cardGrid", {
    eyebrow: "Why Choose Mead",
    heading: "More Than a System. A Partner in Your Kitchen.",
    body: "We're building Mead alongside the restaurants that use it, so it keeps getting better at solving the problems they actually have.",
    theme: "light",
    columns: 2,
    items: [
      { icon: "compass", title: "Local Support In Your Language" },
      { icon: "shieldCheck", title: "Continuous Updates & Improvements" },
      { icon: "rocket", title: "Built for the Future — Scalable & Flexible" },
      { icon: "briefcase", title: "Works Online and Offline" },
    ],
  }),
  block("contactPanel", {
    eyebrow: "Get in touch",
    heading: "Ready to Get Started?",
    body: "Tell us about your restaurant and we'll help you get set up.",
    email: "hello@paraiba.com",
    location: "Addis Ababa, Ethiopia",
    theme: "light",
  }),
  block("cta", {
    eyebrow: "Let's build",
    heading: "Ready to Transform Your Restaurant?",
    body: "Join restaurants using Mead to manage their operations, improve efficiency, and serve better food.",
    buttonLabel: "Get Started Free",
    buttonHref: "#contact",
    theme: "dark",
  }),
];
