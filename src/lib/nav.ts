import "server-only";
import { db } from "@/lib/db";
import { PAGE_SLUGS, type PageSlug } from "@/lib/blocks/types";

export type NavLink = { id: string; label: string; href: string; newTab: boolean };
export type NavGroup = { label: string; links: NavLink[] };
export type NavData = { links: NavLink[]; groups: NavGroup[] };

function publicPathToSlug(href: string): PageSlug | null {
  const slug = href === "/" ? "home" : href.replace(/^\//, "");
  return (PAGE_SLUGS as readonly string[]).includes(slug) ? (slug as PageSlug) : null;
}

// Used by both the header nav and the footer — only items placed at this
// location (or "both") are returned, grouped by their `group` field, and
// any item pointing at an unpublished CMS page is filtered out.
export async function getNavData(location: "header" | "footer"): Promise<NavData> {
  const items = await db.navItem.findMany({
    where: { OR: [{ location }, { location: "both" }] },
    orderBy: { order: "asc" },
  });

  const slugsToCheck = [...new Set(items.map((i) => publicPathToSlug(i.href)).filter((s): s is PageSlug => !!s))];
  const pages = slugsToCheck.length
    ? await db.page.findMany({ where: { slug: { in: slugsToCheck } }, select: { slug: true, published: true } })
    : [];
  const publishedMap = new Map(pages.map((p) => [p.slug, p.published]));

  const visible = items.filter((item) => {
    const slug = publicPathToSlug(item.href);
    return slug ? (publishedMap.get(slug) ?? true) : true;
  });

  const links: NavLink[] = [];
  const groupOrder: string[] = [];
  const groupMap = new Map<string, NavLink[]>();

  for (const item of visible) {
    const link: NavLink = { id: item.id, label: item.label, href: item.href, newTab: item.newTab };
    if (item.group) {
      if (!groupMap.has(item.group)) {
        groupMap.set(item.group, []);
        groupOrder.push(item.group);
      }
      groupMap.get(item.group)!.push(link);
    } else {
      links.push(link);
    }
  }

  const groups: NavGroup[] = groupOrder.map((label) => ({ label, links: groupMap.get(label)! }));
  return { links, groups };
}
