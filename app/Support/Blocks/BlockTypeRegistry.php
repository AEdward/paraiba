<?php

namespace App\Support\Blocks;

/**
 * Mirrors src/lib/blocks/types.ts's BLOCK_TYPES + BlockDataMap + defaults.ts
 * from the old app. Single source of truth for labels and default data
 * shapes, read by both the admin "add block" picker and (indirectly) by
 * what each block's Blade partial/component expects in $data.
 */
class BlockTypeRegistry
{
    // Full set, usable on main site Pages.
    public const ALL_TYPES = [
        'hero', 'richText', 'cardGrid', 'industriesShowcase', 'statsBar',
        'statsQuote', 'quote', 'cta', 'productsPreview', 'partnersTrustBar',
        'openPositions', 'contactPanel', 'productsGrid', 'section', 'techStack',
        'productsSpotlight', 'processSteps', 'pageHeader', 'challengeGrid', 'calloutBanner', 'serviceCards', 'storySplit', 'introSplit', 'iconCards', 'principles', 'statementBand', 'productList', 'partnerPanel',
    ];

    // Restricted subset usable on product-site (microsite) pages — excludes
    // the "live corporate data" types that only make sense on the main site.
    public const MICROSITE_TYPES = [
        'hero', 'richText', 'cardGrid', 'statsBar', 'statsQuote', 'quote', 'cta', 'contactPanel', 'section',
    ];

    public const LABELS = [
        'hero' => 'Hero',
        'richText' => 'Rich text',
        'cardGrid' => 'Card grid',
        'industriesShowcase' => 'Industries showcase',
        'statsBar' => 'Stats bar',
        'statsQuote' => 'Stats + quote',
        'quote' => 'Quote',
        'cta' => 'Call to action',
        'productsPreview' => 'Products preview (live)',
        'partnersTrustBar' => 'Partners trust bar (live)',
        'openPositions' => 'Open positions (live)',
        'contactPanel' => 'Contact panel',
        'productsGrid' => 'Products grid (live)',
        'section' => 'Section (freeform)',
        'techStack' => 'Tech stack',
        'productsSpotlight' => 'Products spotlight (device cards)',
        'processSteps' => 'Process steps (numbered)',
        'pageHeader' => 'Page header (breadcrumb + title)',
        'challengeGrid' => 'Challenge / solution cards',
        'calloutBanner' => 'Callout banner',
        'serviceCards' => 'Service cards (with bullet points)',
        'storySplit' => 'Story (text + image)',
        'introSplit' => 'Intro (heading + paragraph)',
        'iconCards' => 'Icon cards (e.g. mission / vision)',
        'principles' => 'Principles (icon columns)',
        'statementBand' => 'Statement band (dark)',
        'productList' => 'Product list (rows with links)',
        'partnerPanel' => 'Partner panel (blue, with points)',
    ];

    // Fields edited as a raw JSON textarea rather than individual inputs —
    // repeatable sub-items (card items, stats, lines, etc).
    public const JSON_FIELDS = [
        'hero' => ['sideList', 'trust'],
        'cardGrid' => ['items'],
        'industriesShowcase' => ['items'],
        'statsBar' => ['items'],
        'statsQuote' => ['items'],
        'quote' => ['lines'],
        'techStack' => ['keys'],
        'section' => ['elements'],
        'productsSpotlight' => ['items'],
        'processSteps' => ['items'],
        'challengeGrid' => ['items'],
        'serviceCards' => ['items'],
        'iconCards' => ['items'],
        'principles' => ['items'],
        'productList' => ['items'],
        'partnerPanel' => ['items'],
    ];

    // Mirrors src/lib/blocks/types.ts's 21 SectionElementType values.
    public const SECTION_ELEMENT_TYPES = [
        'heading', 'paragraph', 'list', 'quote', 'pullquote', 'code', 'preformatted', 'details', 'table',
        'image', 'gallery', 'video', 'audio', 'file', 'cover', 'mediaText',
        'icon', 'buttons', 'columns', 'separator', 'spacer',
        'embed',
    ];

    public static function defaultData(string $type): array
    {
        return match ($type) {
            'hero' => [
                'eyebrow' => '', 'headline' => 'Headline', 'headlineHighlight' => '', 'headline2' => '',
                'subhead' => '', 'primaryLabel' => '', 'primaryHref' => '',
                'secondaryLabel' => '', 'secondaryHref' => '',
                'theme' => 'dark', 'align' => 'left', 'showLogo3D' => false,
                'mockupImage' => '', 'phoneImage' => '', 'sideList' => [], 'trust' => [],
            ],
            'richText' => ['body' => '<p></p>', 'imageUrl' => '', 'imagePosition' => 'right', 'imageFit' => 'cover', 'caption' => ''],
            'cardGrid' => ['eyebrow' => '', 'heading' => '', 'columns' => 3, 'layout' => 'grid', 'imageUrl' => '', 'items' => []],
            'industriesShowcase' => ['eyebrow' => '', 'heading' => '', 'body' => '', 'ctaLabel' => '', 'ctaHref' => '', 'items' => [], 'imageUrl' => ''],
            'statsBar' => ['items' => []],
            'statsQuote' => ['items' => [], 'quote' => '', 'attribution' => ''],
            'quote' => ['lines' => [], 'highlight' => ''],
            'cta' => ['eyebrow' => '', 'heading' => '', 'body' => '', 'primaryLabel' => '', 'primaryHref' => '', 'secondaryLabel' => '', 'secondaryHref' => ''],
            'productsPreview' => ['eyebrow' => '', 'heading' => '', 'limit' => 3],
            'partnersTrustBar' => ['eyebrow' => '', 'heading' => ''],
            'openPositions' => ['eyebrow' => '', 'heading' => ''],
            'contactPanel' => ['eyebrow' => '', 'heading' => ''],
            'productsGrid' => ['eyebrow' => '', 'heading' => ''],
            'section' => ['elements' => []],
            'techStack' => ['eyebrow' => '', 'heading' => '', 'keys' => []],
            'productsSpotlight' => ['eyebrow' => '', 'heading' => '', 'body' => '', 'footnote' => '', 'items' => []],
            'processSteps' => ['heading' => '', 'items' => []],
            'pageHeader' => ['breadcrumb' => '', 'eyebrow' => '', 'headlineTop' => '', 'headline' => '', 'headlineHighlight' => '', 'subhead' => '', 'image' => '', 'imageAlt' => ''],
            'challengeGrid' => ['heading' => '', 'challengeLabel' => 'The challenge', 'buildLabel' => 'What we can build', 'items' => []],
            'calloutBanner' => ['icon' => 'sparkle', 'heading' => '', 'body' => ''],
            'serviceCards' => ['eyebrow' => '', 'heading' => '', 'body' => '', 'items' => []],
            'storySplit' => ['eyebrow' => '', 'heading' => '', 'body' => '', 'image' => '', 'imageAlt' => '', 'imagePosition' => 'right'],
            'introSplit' => ['heading' => '', 'body' => ''],
            'iconCards' => ['heading' => '', 'items' => []],
            'principles' => ['heading' => '', 'items' => []],
            'statementBand' => ['heading' => '', 'body' => ''],
            'productList' => ['heading' => '', 'footnote' => '', 'items' => []],
            'partnerPanel' => ['heading' => '', 'body' => '', 'items' => []],
            default => [],
        };
    }
}
