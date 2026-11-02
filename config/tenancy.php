<?php

return [
    // The root domain product subdomains and the portal are hung off.
    // E.g. paraibatech.com — set via ROOT_DOMAIN in .env.
    'root_domain' => env('ROOT_DOMAIN', 'paraiba.test'),

    // Subdomain labels that can never be claimed by a ProductSite, matching
    // src/lib/subdomain.ts's RESERVED_SUBDOMAINS in the Next.js app.
    'reserved_subdomains' => ['www', 'app', 'api', 'admin', 'portal', 'mail', 'ftp'],

    // Product subdomains with a bespoke Blade "shell" (Navbar + Hero)
    // instead of the generic microsite shell. Any subdomain not listed here
    // (including any future product site) falls back to the generic shell.
    'bespoke_shells' => ['yeneta', 'tena', 'mead', 'kinin'],

    // Block types allowed on product-site (microsite) pages — excludes the
    // "live corporate data" block types (productsGrid, partnersTrustBar,
    // openPositions, productsPreview) that only make sense on the main site.
    'microsite_block_types' => [
        'hero', 'richText', 'cardGrid', 'statsBar', 'statsQuote', 'quote', 'cta', 'contactPanel', 'section',
    ],
];
