// Yeneta's home-page content below its bespoke hero, matching the reference
// design's sections. Seeded once via republishYenetaHome.ts, then editable
// from /admin/product-sites/[id]/pages/home like any other block.

import type { BlockDataMap, BlockType, RichDoc } from "../src/lib/blocks/types";

export type SeedBlock<T extends BlockType = BlockType> = { type: T; data: BlockDataMap[T] };

function block<T extends BlockType>(type: T, data: BlockDataMap[T]): SeedBlock<T> {
  return { type, data };
}

const operationsDoc: RichDoc = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Yeneta is built around how schools actually run day to day — enrollment, attendance, grading, and communication with parents, all in one place. It's designed to be simple enough for any staff member to pick up, and reliable enough to run a whole school on.",
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

export const yenetaHomeBlocks: SeedBlock[] = [
  block("statsBar", {
    theme: "light",
    items: [
      { icon: "zap", label: "Save Time", sublabel: "Automate routine tasks" },
      { icon: "compass", label: "Improve Communication", sublabel: "Keep everyone connected" },
      { icon: "lightbulb", label: "Better Learning", sublabel: "Support student success" },
      { icon: "target", label: "Data-Driven Decisions", sublabel: "Make informed choices" },
    ],
  }),
  block("cardGrid", {
    eyebrow: "Why Yeneta",
    heading: "Everything You Need to Manage Your School",
    body: "Yeneta brings together all the essential tools you need to run your school — from students and academics to attendance and reporting. Designed for schools of all sizes, it's simple to use, powerful, and built to grow with you.",
    theme: "light",
    columns: 3,
    anchorId: "features",
    viewAllLabel: "Explore All Features",
    viewAllHref: "#features",
    items: [
      { icon: "briefcase", title: "Student Management", description: "Keep student records, enrollment, and profiles organized." },
      { icon: "lightbulb", title: "Academic Management", description: "Manage classes, subjects, grading, and report cards." },
      { icon: "target", title: "Attendance Tracking", description: "Track daily attendance for students and staff." },
      { icon: "compass", title: "Teacher Management", description: "Organize staff assignments, schedules, and records." },
      { icon: "sparkles", title: "Parent Portal", description: "Keep parents informed and connected to their child's progress." },
      { icon: "cpu", title: "Reports & Analytics", description: "Get real-time insights into school performance." },
    ],
  }),
  block("richText", {
    eyebrow: "Streamline Your Operations",
    heading: "Built for Schools, Teachers and Parents",
    body: operationsDoc,
    theme: "dark",
  }),
  block("cardGrid", {
    eyebrow: "Why Choose Yeneta",
    heading: "More Than a System. A Partner in Education.",
    body: "We're building Yeneta alongside the schools that use it, so it keeps getting better at solving the problems they actually have.",
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
    body: "Tell us about your school and we'll help you get set up.",
    theme: "light",
  }),
  block("cta", {
    eyebrow: "Let's build",
    heading: "Ready to Transform Your School?",
    body: "Join schools using Yeneta to simplify operations, connect their community, and help every student succeed.",
    buttonLabel: "Get Started Free",
    buttonHref: "#contact",
    theme: "dark",
  }),
];
