// Kinin's home-page content below its bespoke hero, matching the reference
// design's sections. Seeded once via republishKininHome.ts, then editable
// from /admin/product-sites/[id]/pages/home like any other block.

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
          text: "Kinin understands the unique needs of pharmacies. From compliance and traceability to fast and accurate dispensing, our system helps you stay efficient, compliant, and focused on what matters most — your customers' health.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        "Supports regulatory compliance",
        "Improves medication traceability",
        "Helps reduce stockouts and waste",
        "Built for pharmacies, drug stores, and hospitals",
      ].map((item) => ({
        type: "listItem",
        content: [{ type: "paragraph", content: [{ type: "text", text: item }] }],
      })),
    },
  ],
};

export const kininHomeBlocks: SeedBlock[] = [
  block("statsBar", {
    theme: "light",
    items: [
      { icon: "shieldCheck", label: "Trusted by Pharmacies & Drug Stores" },
      { icon: "target", label: "Reduce Errors", sublabel: "With digital workflow" },
      { icon: "zap", label: "Improve Efficiency", sublabel: "And customer service" },
      { icon: "lightbulb", label: "Secure & Reliable", sublabel: "Cloud technology" },
    ],
  }),
  block("cardGrid", {
    eyebrow: "Why Kinin",
    heading: "Everything You Need to Run a Modern Pharmacy",
    body: "Kinin brings together all the essential tools you need to manage your pharmacy operations — from inventory and prescriptions to sales and reporting. Designed for pharmacies of all sizes, it's simple to use, powerful, and built for growth.",
    theme: "light",
    columns: 3,
    anchorId: "features",
    viewAllLabel: "Explore All Features",
    viewAllHref: "#features",
    items: [
      { icon: "cloud", title: "Inventory Management", description: "Track stock, expiry dates, and reorder levels." },
      { icon: "target", title: "Prescription Management", description: "Fill and manage prescriptions with ease." },
      { icon: "zap", title: "Sales & POS", description: "Process sales, returns, and payments." },
      { icon: "briefcase", title: "Customer Management", description: "Keep patient records and history." },
      { icon: "sparkles", title: "Reporting & Analytics", description: "Get real-time insights and reports." },
      { icon: "compass", title: "Multi-Branch Support", description: "Manage multiple locations from one system." },
    ],
  }),
  block("richText", {
    eyebrow: "Built for Pharmacies",
    heading: "Designed for the Pharmaceutical Industry",
    body: industryDoc,
    theme: "dark",
  }),
  block("cardGrid", {
    eyebrow: "Powerful Features",
    heading: "Built to Make Your Pharmacy More Efficient",
    body: "From day-to-day operations to long-term growth, Kinin gives you the tools to do more.",
    theme: "light",
    columns: 3,
    items: [
      { icon: "target", title: "Fast & Accurate Dispensing" },
      { icon: "cloud", title: "Real-time Inventory Tracking" },
      { icon: "zap", title: "Automated Reordering" },
      { icon: "shieldCheck", title: "Secure Patient Data" },
      { icon: "briefcase", title: "Regulatory Compliance" },
    ],
  }),
  block("contactPanel", {
    eyebrow: "Get in touch",
    heading: "Ready to Get Started?",
    body: "Tell us about your pharmacy and we'll help you get set up.",
    email: "hello@paraiba.com",
    location: "Addis Ababa, Ethiopia",
    theme: "light",
  }),
  block("cta", {
    eyebrow: "Let's build",
    heading: "Ready to Transform Your Pharmacy?",
    body: "Join pharmacies already using Kinin to manage their operations, improve efficiency, and deliver better care.",
    buttonLabel: "Get Started Free",
    buttonHref: "#contact",
    theme: "dark",
  }),
];
