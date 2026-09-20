import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE } from "@/lib/auth";
import { getProductSubdomain } from "@/lib/subdomain";

export async function proxy(request: NextRequest) {
  const subdomain = getProductSubdomain(request.headers.get("host"), process.env.ROOT_DOMAIN ?? "");
  if (subdomain) {
    const url = request.nextUrl.clone();
    url.pathname = `/sites/${subdomain}${request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
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
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Runs on every page route (needed to catch a product subdomain's "/"),
  // but skips API routes, Next internals, and static file requests — a
  // rewritten path for those would 404 or serve the wrong file.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?|ttf)$).*)",
  ],
};
