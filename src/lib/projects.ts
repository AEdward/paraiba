// Client-safe: types and pure presentation helpers only. No database import
// here — this file is imported from client components (ProjectCard,
// ProjectsGrid, StatusBadge), and pulling in Prisma/libsql would break the
// client bundle. DB-backed data fetching lives in lib/projects-data.ts.

export type ProjectStatus = "live" | "in-progress" | "concept" | "archived";

export type Project = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  link?: string;
  // Screenshot shown in the laptop/phone showcase on the detail page.
  // Leave unset to show a branded placeholder until one is ready.
  screenshot?: string;
  // Render `link` live in an iframe inside the device mockup instead of the
  // screenshot. Only works if the target site allows being framed (no
  // X-Frame-Options/CSP frame-ancestors block) — falls back visually to a
  // blank frame if it doesn't, so only enable this for sites you control.
  embedLive: boolean;
  // "owner/repo" — boots and renders the app live from source via
  // StackBlitz, no deployment needed. Takes priority over embedLive/link.
  githubRepo?: string;
  // Shown in the large showcase hero above the /products grid.
  featured: boolean;
  // "## Category\n- item\n- item" blocks — rendered as grouped cards.
  deliverables?: string;
  // "## Section\nbody text" blocks — rendered as numbered case-study sections.
  caseStudy?: string;
  // <subdomain>.<root domain> — set once this product has its own mini-site.
  subdomain?: string;
  // Shown in the mini-site's own nav instead of the Paraiba logo.
  logoUrl?: string;
  // Override --color-ember/--color-teal and --color-amber on the mini-site;
  // unset falls back to Paraiba's own brand colors.
  themeColor?: string;
  themeColorSecondary?: string;
};

export function getEmbedUrl(project: Project): string | undefined {
  if (project.githubRepo) {
    return `https://stackblitz.com/github/${project.githubRepo}?embed=1&view=preview&hideNavigation=1&hideDevTools=1`;
  }
  if (project.embedLive && project.link) {
    return project.link;
  }
  return undefined;
}

// What the browser-chrome "address bar" shows above a live embed — the real
// source, not the StackBlitz embed URL with its query-string plumbing.
export function getEmbedLabel(project: Project): string | undefined {
  if (project.githubRepo) return `github.com/${project.githubRepo}`;
  if (project.embedLive && project.link) {
    try {
      const url = new URL(project.link);
      return url.hostname + (url.pathname === "/" ? "" : url.pathname);
    } catch {
      return project.link;
    }
  }
  return undefined;
}

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "Building",
  concept: "Prototype",
  archived: "Built · not published",
};

export const statusColor: Record<ProjectStatus, string> = {
  live: "var(--color-teal)",
  "in-progress": "var(--color-amber)",
  concept: "var(--color-ember)",
  archived: "var(--color-slate)",
};

// Showcase gradient for the device mockup, rotated deterministically by slug
// so every project gets a consistent brand-color pairing without configuration.
const showcaseGradients = [
  "linear-gradient(135deg, var(--color-teal) 0%, var(--color-indigo) 100%)",
  "linear-gradient(135deg, var(--color-amber) 0%, var(--color-indigo) 100%)",
  "linear-gradient(135deg, var(--color-ember) 0%, var(--color-indigo) 100%)",
];

export function getShowcaseGradient(slug: string): string {
  // djb2 hash — spreads similar slugs (e.g. "project-one" vs "project-two")
  // across different gradients better than a plain character-code sum would.
  let hash = 5381;
  for (const char of slug) hash = (hash * 33 + char.charCodeAt(0)) | 0;
  return showcaseGradients[Math.abs(hash) % showcaseGradients.length];
}
