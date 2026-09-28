// Pure string logic, no DB access — safe to run inside the proxy/middleware,
// which can't use the Prisma/pg driver adapter this app relies on elsewhere.

export const RESERVED_SUBDOMAINS = new Set(["www", "app", "api", "admin", "portal", "mail", "ftp"]);

// Returns the product subdomain a request's Host header targets, or null if
// it's the main site. "<sub>.localhost[:port]" always works in local dev,
// regardless of ROOT_DOMAIN, so subdomain routing can be tested without
// touching DNS or /etc/hosts.
export function getProductSubdomain(host: string | null, rootDomain: string): string | null {
  if (!host) return null;
  const hostname = host.split(":")[0].toLowerCase();

  if (hostname.endsWith(".localhost")) {
    const sub = hostname.slice(0, -".localhost".length);
    return sub && !RESERVED_SUBDOMAINS.has(sub) ? sub : null;
  }

  const root = rootDomain.toLowerCase().trim();
  if (!root || hostname === root || hostname === `www.${root}`) return null;
  if (!hostname.endsWith(`.${root}`)) return null;

  const sub = hostname.slice(0, -(root.length + 1));
  // A single label only — a deeper subdomain (e.g. a future
  // app.temari.paraiba.com for the real application) isn't handled here.
  if (!sub || sub.includes(".") || RESERVED_SUBDOMAINS.has(sub)) return null;
  return sub;
}

// True if a request's Host header targets the "portal" subdomain, which the
// proxy maps to the admin dashboard so it never shows "/admin" in the URL.
export function isPortalHost(host: string | null, rootDomain: string): boolean {
  if (!host) return false;
  const hostname = host.split(":")[0].toLowerCase();
  if (hostname === "portal.localhost") return true;
  const root = rootDomain.toLowerCase().trim();
  return Boolean(root) && hostname === `portal.${root}`;
}

// The inverse of getProductSubdomain — builds the absolute URL for a
// product site given its subdomain, e.g. for linking/redirecting to it
// from the main site. "<rootDomain>" containing "localhost" (any port)
// always resolves over http, matching local dev; anything else is https.
export function getProductSiteUrl(subdomain: string, rootDomain: string): string {
  const protocol = rootDomain.toLowerCase().includes("localhost") ? "http" : "https";
  return `${protocol}://${subdomain}.${rootDomain}`;
}

// The absolute URL for the main Paraiba site itself, for a product site's
// "back to Paraiba" link. Same http/https rule as getProductSiteUrl.
export function getRootSiteUrl(rootDomain: string): string {
  const protocol = rootDomain.toLowerCase().includes("localhost") ? "http" : "https";
  return `${protocol}://${rootDomain}`;
}
