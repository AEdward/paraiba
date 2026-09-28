import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { getPageBlocks } from "@/lib/blocks/data";
import { getSiteSettings, SOCIAL_LINK_KEYS } from "@/lib/site-settings";
import { getRootSiteUrl } from "@/lib/subdomain";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [blocks, settings] = await Promise.all([getPageBlocks("home"), getSiteSettings()]);
  const baseUrl = getRootSiteUrl(process.env.ROOT_DOMAIN || "localhost:3000");
  const sameAs = SOCIAL_LINK_KEYS.map((key) => settings[key]).filter((url): url is string => Boolean(url));

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Paraiba Technology PLC",
    url: baseUrl,
    logo: `${baseUrl}/paraiba-logo-full.png`,
    email: settings.email,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: settings.officeLocation,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </>
  );
}
