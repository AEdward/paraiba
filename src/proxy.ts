import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth";
import { getProductSubdomain, isPortalHost } from "@/lib/subdomain";

export async function proxy(request: NextRequest) {
  const subdomain = getProductSubdomain(request.headers.get("host"), process.env.ROOT_DOMAIN ?? "");
  if (subdomain) {
    const url = request.nextUrl.clone();
    url.pathname = `/sites/${subdomain}${request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  // The "portal" subdomain is the admin dashboard's own host — every path on
  // it maps to the same path under /admin, so the URL never shows "/admin".
  const portalHost = isPortalHost(request.headers.get("host"), process.env.ROOT_DOMAIN ?? "");
  const requestPath = request.nextUrl.pathname;
  const adminPath = portalHost ? `/admin${requestPath === "/" ? "" : requestPath}` : requestPath;

  const rewriteIfPortal = () => {
    if (!portalHost) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = adminPath;
    return NextResponse.rewrite(url);
  };

  if (!adminPath.startsWith("/admin")) {
    return rewriteIfPortal();
  }

  if (adminPath === "/admin/login") {
    return rewriteIfPortal();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const secret = process.env.AUTH_SECRET;

  let authenticated = false;
  if (token && secret) {
    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
      authenticated = true;
    } catch {
      authenticated = false;
    }
  }

  if (!authenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = portalHost ? "/login" : "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return rewriteIfPortal();
}

export const config = {
  // Runs on every page route (needed to catch a product subdomain's "/"),
  // but skips API routes, Next internals, and static file requests — a
  // rewritten path for those would 404 or serve the wrong file.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?|ttf)$).*)",
  ],
};
