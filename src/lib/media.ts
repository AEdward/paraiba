// Client-safe: pure presentation helper only. Mirrors productSiteLogoSrc()/
// partnerLogoSrc() — an uploaded asset takes priority over a pasted URL.

import type { MediaRef } from "@/lib/blocks/types";

export function mediaSrc(ref: MediaRef | undefined | null): string | undefined {
  if (!ref) return undefined;
  if (ref.assetId) return `/api/media/${ref.assetId}`;
  return ref.url || undefined;
}
