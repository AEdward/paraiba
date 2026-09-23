// Seeds the CMS Page/Block content that reproduces the site's original,
// hand-written copy — run once per environment so the pages aren't blank
// after the migration to the block-based CMS. Safe to re-run: skips any
// page slug that already has blocks.

import type { PrismaClient, Prisma } from "../src/generated/prisma/client";
import type { BlockDataMap, BlockType, PageSlug, RichDoc } from "../src/lib/blocks/types";

type DocText = { type: "text"; text: string; marks?: { type: string }[] };
type DocNode = { type: string; attrs?: Record<string, unknown>; content?: DocNode[] };

const t = (text: string, bold = false): DocText =>
  bold ? { type: "text", text, marks: [{ type: "bold" }] } : { type: "text", text };
const p = (...content: DocText[]): DocNode => ({ type: "paragraph", content });
const doc = (...content: DocNode[]): RichDoc => ({ type: "doc", content });

export type SeedBlock<T extends BlockType = BlockType> = { type: T; data: BlockDataMap[T] };

function block<T extends BlockType>(type: T, data: BlockDataMap[T]): SeedBlock<T> {
  return { type, data };
}

export const homeBlocks: SeedBlock[] = [
  block("hero", {
    eyebrow: "Building a Smarter Digital Tomorrow",
    headline: "Powering Businesses with Innovative ",
    headlineHighlight: "Technology",
    subhead:
      "Paraiba Technology PLC builds powerful software products and delivers comprehensive technology services to help businesses in Ethiopia and beyond grow, modernize and achieve more.",
    primaryLabel: "Browse Our Products",
    primaryHref: "/products",
    secondaryLabel: "Get a Free Consultation",
    secondaryHref: "/contact",
    theme: "light",
    align: "left",
    showLogo3D: true,
  }),
  block("statsBar", {
    theme: "light",
    items: [
      { icon: "star", label: "Trusted by Growing Businesses", sublabel: "From startups to enterprise" },
      { icon: "compass", label: "Local Expertise", sublabel: "Built for Ethiopia, ready for the world" },
      { icon: "shieldCheck", label: "Secure & Reliable", sublabel: "Your data, our priority" },
      { icon: "lightbulb", label: "Ongoing Support", sublabel: "We're with you, always" },
    ],
  }),
  block("productsPreview", {
    eyebrow: "Our Products",
    heading: "Complete Solutions for Every Industry",
    viewAllLabel: "View All Products",
    limit: 6,
    theme: "light",
  }),
  block("cardGrid", {
    eyebrow: "Industries We Serve",
    heading: "Tailored Solutions for Every Industry",
    body: "We understand that every industry has unique challenges. That's why we build industry-specific solutions that fit your business needs and processes.",
    theme: "dark",
    columns: 3,
    viewAllLabel: "View All Industries",
    viewAllHref: "/solutions",
    items: [
      { icon: "lightbulb", title: "Education", description: "Schools & institutions" },
      { icon: "shieldCheck", title: "Healthcare", description: "Clinics & hospitals" },
      { icon: "sparkles", title: "Restaurant", description: "Restaurants & cafés" },
      { icon: "target", title: "Pharmacy", description: "Pharmacies" },
      { icon: "gem", title: "Hospitality", description: "Hotels & guesthouses" },
    ],
  }),
  block("cardGrid", {
    eyebrow: "Our Services",
    heading: "Technology Services for Your Next Big Move",
    body: "We offer a full range of development and IT services to help you build, scale and stay ahead in the digital world.",
    theme: "light",
    columns: 3,
    viewAllLabel: "View All Services",
    viewAllHref: "/services",
    items: [
      { icon: "sparkles", title: "Web Development", description: "Corporate websites, e-commerce, and web applications." },
      { icon: "zap", title: "Mobile App Development", description: "Android, iOS, and cross-platform apps." },
      { icon: "cpu", title: "Custom Software Development", description: "Business systems and internal tools built to fit." },
      { icon: "gem", title: "UI/UX Design", description: "Product design, research, and prototyping." },
      { icon: "cloud", title: "Cloud & Infrastructure", description: "Deployment, hosting, and monitoring." },
      { icon: "target", title: "API & System Integration", description: "Payments, third-party APIs, and system integrations." },
    ],
  }),
  block("cardGrid", {
    eyebrow: "Why Paraiba",
    heading: "Your Success Is Our Mission",
    body: "We combine technical expertise, industry knowledge and a passion for innovation to deliver solutions that make a real difference.",
    theme: "dark",
    columns: 2,
    viewAllLabel: "Learn More About Us",
    viewAllHref: "/about",
    items: [
      { icon: "briefcase", title: "Expert Team", description: "Skilled professionals with real-world experience." },
      { icon: "target", title: "Proven Track Record", description: "Successful projects across multiple industries." },
      { icon: "rocket", title: "Innovation Driven", description: "We build for today, ready for tomorrow." },
      { icon: "gem", title: "Client Focused", description: "Your goals are at the center of everything we do." },
    ],
  }),
  block("partnersTrustBar", { eyebrow: "Growing Together with Amazing Clients", theme: "light" }),
  block("cta", {
    eyebrow: "Let's build",
    heading: "Ready to Build Something Great?",
    body: "Let's turn your idea into powerful digital solutions. Whether you need custom software, one of our products, or a full digital transformation — we're here to help.",
    buttonLabel: "Get Started",
    buttonHref: "/contact",
    theme: "dark",
  }),
];

const aboutBlocks: SeedBlock[] = [
  block("hero", {
    eyebrow: "About Us",
    headline: "A new discovery from Ethiopia.",
    theme: "light",
    align: "left",
  }),
  block("richText", {
    theme: "light",
    body: doc(
      p(
        t("Paraiba Technology PLC", true),
        t(
          " is an Ethiopian technology company building the next generation of digital products, platforms, and technology solutions.",
        ),
      ),
      p(
        t(
          "Just as Paraiba represents something rare and brilliant discovered in Ethiopia, Paraiba Technology is our own new addition to Ethiopia's growing technology landscape — born here, built here, and created with ambitions that reach far beyond Ethiopia.",
        ),
      ),
      p(
        t(
          "We believe great technology doesn't simply have to be imported. It can be discovered, designed, engineered, and built here.",
        ),
      ),
      p(
        t(
          "At Paraiba, we combine technology, design, and practical problem-solving to turn ideas into products people can actually use. We are currently developing our own portfolio of digital products while also helping businesses and organizations build the technology they need to operate, grow, and connect.",
        ),
      ),
    ),
  }),
  block("richText", {
    eyebrow: "More Than a Technology Company",
    heading: "We are building technology.",
    theme: "light",
    body: doc(
      p(
        t(
          "Paraiba is not built around simply writing software for clients. Some of that technology will be created for businesses. Some will become products of our own. And some may grow into platforms capable of serving thousands or millions of users.",
        ),
      ),
      p(
        t("Our goal is to create a company where "),
        t("products, platforms, services, and innovation live under one technology brand.", true),
      ),
    ),
  }),
  block("richText", {
    eyebrow: "Our Origin",
    heading: "Born in Ethiopia. Built for the world.",
    theme: "light",
    tint: true,
    body: doc(
      p(
        t(
          "Ethiopia is where Paraiba begins. We see Ethiopia not only as our home market, but as a place where ambitious technology can be created and exported to the world.",
        ),
      ),
      p(
        t(
          "Our identity is Ethiopian in origin, but our ambition is global. We want Paraiba to become a technology brand recognized for creating products that are useful, beautifully designed, reliable, and built to scale.",
        ),
      ),
    ),
  }),
  block("cardGrid", {
    eyebrow: "Our Philosophy",
    heading: "We believe technology should be —",
    theme: "light",
    columns: 2,
    items: [
      { title: "Powerful enough to make an impact." },
      { title: "Simple enough to use." },
      { title: "Beautiful enough to inspire." },
      { title: "Reliable enough to trust." },
    ],
  }),
  block("richText", {
    theme: "light",
    body: doc(
      p(
        t("We don't build technology for the sake of technology. "),
        t("We build technology that moves ideas forward.", true),
      ),
    ),
  }),
  block("cardGrid", {
    eyebrow: "What We Value",
    heading: "How we build.",
    theme: "light",
    columns: 3,
    items: [
      { icon: "lightbulb", title: "Innovation", description: "Build useful things, not technology for its own sake." },
      { icon: "sparkles", title: "Clarity", description: "Make complex technology understandable and usable." },
      {
        icon: "shieldCheck",
        title: "Reliability",
        description: "Prioritize stable products, security and dependable delivery.",
      },
      {
        icon: "gem",
        title: "Craft",
        description: "Care about details, design and the quality of the final experience.",
      },
      { icon: "target", title: "Impact", description: "Measure success by the value technology creates." },
    ],
  }),
  block("quote", {
    eyebrow: "Paraiba",
    intro: "A new discovery from Ethiopia.",
    lines: [
      "A new name in technology.",
      "A new generation of digital products.",
      "A new kind of technology company.",
    ],
    highlight: "Technology with Ethiopian Brilliance.",
    theme: "dark",
  }),
];

const careersBlocks: SeedBlock[] = [
  block("hero", {
    eyebrow: "Careers",
    headline: "Build technology with Ethiopian brilliance.",
    subhead:
      "We're a small team building technology, products, and ventures out of Addis Ababa. If that sounds like your kind of work, we'd like to hear from you.",
    theme: "dark",
    align: "center",
  }),
  block("cardGrid", {
    heading: "Why Paraiba",
    theme: "light",
    columns: 3,
    items: [
      {
        icon: "rocket",
        title: "Build things that ship",
        description: "Real products for real users, not exercises that live in a drawer.",
      },
      {
        icon: "compass",
        title: "Room to shape direction",
        description: "We're small enough that your judgment changes what gets built and how.",
      },
      {
        icon: "briefcase",
        title: "Work across the portfolio",
        description: "Move between projects and problems instead of one narrow lane forever.",
      },
    ],
  }),
  block("openPositions", { heading: "Open positions", theme: "light" }),
];

const contactBlocks: SeedBlock[] = [
  block("contactPanel", {
    eyebrow: "Get in touch",
    heading: "Let's build something new.",
    body: "Have a project, partnership, or investment idea in mind? We'd love to hear about it.",
    email: "hello@paraiba.com",
    location: "Addis Ababa, Ethiopia",
    theme: "light",
  }),
];

const productsBlocks: SeedBlock[] = [
  block("productsGrid", {
    eyebrow: "Portfolio",
    heading: "Products",
    body: "The products we're building — from first sketch to shipped software.",
    emptyMessage: "No products published yet — we're currently building.",
    theme: "light",
  }),
];

const solutionsBlocks: SeedBlock[] = [
  block("hero", {
    eyebrow: "Solutions",
    headline: "Software Built for Your Industry",
    subhead:
      "Paraiba doesn't build one tool that tries to do everything — we build dedicated software for each industry we serve, so it actually fits how that business runs.",
    theme: "dark",
    align: "center",
  }),
  block("cta", {
    eyebrow: "Education",
    heading: "School Management, Simplified",
    body: "Yeneta helps schools manage students, academics, attendance, and communication with parents — all in one place, built for how schools actually operate.",
    buttonLabel: "Explore Yeneta",
    buttonHref: "/products/yeneta",
    theme: "light",
  }),
  block("cta", {
    eyebrow: "Healthcare",
    heading: "Quality Care, Better Managed",
    body: "Tena helps hospitals, clinics, and healthcare providers coordinate patient records, scheduling, and billing — so care teams can focus on patients, not paperwork.",
    buttonLabel: "Explore Tena",
    buttonHref: "/products/tena",
    theme: "dark",
  }),
  block("cta", {
    eyebrow: "Pharmacy",
    heading: "Smarter Pharmacy Operations",
    body: "Kinin helps pharmacies and drug stores manage inventory, prescriptions, and sales — reducing errors and keeping shelves stocked with what customers need.",
    buttonLabel: "Explore Kinin",
    buttonHref: "/products/kinin",
    theme: "light",
  }),
  block("cta", {
    eyebrow: "Restaurant",
    heading: "From Kitchen to Counter",
    body: "Mead helps restaurants, cafés, and food businesses manage orders, tables, staff, and inventory — so teams can focus on serving great food.",
    buttonLabel: "Explore Mead",
    buttonHref: "/products/mead",
    theme: "dark",
  }),
  block("cta", {
    eyebrow: "Hospitality",
    heading: "Guest Experience, from Booking to Checkout",
    body: "Enegeda (እንግዳ — \"guest\") manages bookings, rooms, housekeeping, and billing for hotels and guesthouses. Currently in development.",
    buttonLabel: "Learn More",
    buttonHref: "/products/enegeda",
    theme: "light",
  }),
  block("contactPanel", {
    eyebrow: "Don't see your industry?",
    heading: "Let's Talk About Your Business",
    body: "Every business has its own workflow. If your industry isn't listed here, tell us about it — we'd love to see if we can help.",
    email: "hello@paraiba.com",
    location: "Addis Ababa, Ethiopia",
    theme: "light",
  }),
];

const PAGE_SEEDS: Record<PageSlug, SeedBlock[]> = {
  home: homeBlocks,
  about: aboutBlocks,
  careers: careersBlocks,
  contact: contactBlocks,
  products: productsBlocks,
  solutions: solutionsBlocks,
};

const PAGE_TITLES: Record<PageSlug, string> = {
  home: "Home",
  about: "About",
  careers: "Careers",
  contact: "Contact",
  products: "Products",
  solutions: "Solutions",
};

export async function seedPages(db: PrismaClient) {
  for (const slug of Object.keys(PAGE_SEEDS) as PageSlug[]) {
    const existing = await db.page.findUnique({ where: { slug } });
    if (existing) {
      console.log(`Page "${slug}" already has content, skipping.`);
      continue;
    }

    const blocks = PAGE_SEEDS[slug];
    await db.page.create({
      data: {
        slug,
        title: PAGE_TITLES[slug],
        blocks: {
          create: blocks.map((b, i) => ({ type: b.type, order: i, data: b.data as Prisma.InputJsonValue })),
        },
      },
    });
    console.log(`Seeded page "${slug}" with ${blocks.length} blocks.`);
  }
}
