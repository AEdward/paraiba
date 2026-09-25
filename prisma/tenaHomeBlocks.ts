// Tena's home-page content below its bespoke hero, following the same
// pattern as Kinin and Yeneta. Seeded once via republishTenaHome.ts, then
// editable from /admin/product-sites/[id]/pages/home like any other block.

import type { BlockDataMap, BlockType, RichDoc } from "../src/lib/blocks/types";

export type SeedBlock<T extends BlockType = BlockType> = { type: T; data: BlockDataMap[T] };

function block<T extends BlockType>(type: T, data: BlockDataMap[T]): SeedBlock<T> {
  return { type, data };
}

const healthcareDoc: RichDoc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Tena is built around how clinics and hospitals actually operate — coordinating patient records, scheduling, and billing across departments without adding administrative overhead. It keeps care teams focused on patients, not paperwork.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        "Supports patient data privacy and compliance",
        "Coordinates across multiple departments",
        "Reduces administrative overhead",
        "Built for clinics, hospitals, and health centers",
      ].map((item) => ({
        type: "listItem",
        content: [{ type: "paragraph", content: [{ type: "text", text: item }] }],
      })),
    },
  ],
};

export const tenaHomeBlocks: SeedBlock[] = [
  block("statsBar", {
    theme: "light",
    items: [
      { icon: "shieldCheck", label: "Trusted by Healthcare Providers" },
      { icon: "target", label: "Reduce Wait Times", sublabel: "With streamlined scheduling" },
      { icon: "zap", label: "Improve Patient Care", sublabel: "With coordinated records" },
      { icon: "lightbulb", label: "Secure & Compliant", sublabel: "Cloud technology" },
    ],
  }),
  block("cardGrid", {
    eyebrow: "Why Tena",
    heading: "Everything You Need to Run a Modern Practice",
    body: "Tena brings together all the essential tools you need to manage your practice — from patient records and scheduling to billing and reporting. Designed for clinics and hospitals of all sizes, it's simple to use, powerful, and built for growth.",
    theme: "light",
    layout: "split",
    cardStyle: "tinted",
    columns: 3,
    anchorId: "features",
    viewAllLabel: "Explore All Services",
    viewAllHref: "#features",
    items: [
      { icon: "briefcase", title: "Patient Records", description: "Keep patient history and records organized and secure." },
      { icon: "compass", title: "Appointment Scheduling", description: "Manage bookings and reduce patient wait times." },
      { icon: "cloud", title: "Billing & Invoicing", description: "Process payments, claims, and invoices with ease." },
      { icon: "target", title: "Staff Management", description: "Organize schedules, roles, and departments." },
      { icon: "zap", title: "Prescriptions", description: "Write and track prescriptions digitally." },
      { icon: "cpu", title: "Reports & Analytics", description: "Get real-time insights into practice performance." },
    ],
  }),
  block("richText", {
    eyebrow: "Built for Healthcare",
    heading: "Designed for Clinics and Hospitals",
    body: healthcareDoc,
    theme: "dark",
  }),
  block("cardGrid", {
    eyebrow: "Powerful Features",
    heading: "Built to Improve Every Patient Interaction",
    body: "From the front desk to the back office, Tena gives your team the tools to do more.",
    theme: "light",
    layout: "split",
    cardStyle: "tinted",
    columns: 3,
    items: [
      { icon: "target", title: "Fast Patient Check-in" },
      { icon: "cloud", title: "Real-time Bed & Resource Tracking" },
      { icon: "zap", title: "Automated Reminders" },
      { icon: "shieldCheck", title: "Secure Patient Data" },
      { icon: "briefcase", title: "Regulatory Compliance" },
    ],
  }),
  block("contactPanel", {
    eyebrow: "Get in touch",
    heading: "Ready to Get Started?",
    body: "Tell us about your practice and we'll help you get set up.",
    theme: "light",
  }),
  block("cta", {
    eyebrow: "Let's build",
    heading: "Ready to Transform Your Practice?",
    body: "Join clinics and hospitals using Tena to manage their operations, improve efficiency, and deliver better care.",
    buttonLabel: "Book Appointment",
    buttonHref: "#contact",
    theme: "dark",
  }),
];
