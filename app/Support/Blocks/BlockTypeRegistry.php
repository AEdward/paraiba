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
    ];

    // Fields edited as a raw JSON textarea rather than individual inputs —
    // repeatable sub-items (card items, stats, lines, etc).
    public const JSON_FIELDS = [
        'hero' => ['sideList'],
        'cardGrid' => ['items'],
        'industriesShowcase' => ['items'],
        'statsBar' => ['items'],
        'statsQuote' => ['items'],
        'quote' => ['lines'],
        'techStack' => ['keys'],
        'section' => ['elements'],
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
                'eyebrow' => '', 'headline' => 'Headline', 'headlineHighlight' => '',
                'subhead' => '', 'primaryLabel' => '', 'primaryHref' => '',
                'secondaryLabel' => '', 'secondaryHref' => '',
                'theme' => 'dark', 'align' => 'left', 'showLogo3D' => false,
                'mockupImage' => '', 'sideList' => [],
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
            default => [],
        };
    }
}
