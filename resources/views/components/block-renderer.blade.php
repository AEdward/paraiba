@props(['blocks', 'allowedTypes' => null])

@php
    $list = collect($blocks)
        ->filter(fn ($block) => ! $allowedTypes || in_array($block->type, $allowedTypes, true))
        ->values();

    // A stats bar placed directly after a hero is drawn inside the hero
    // (as its trust points) so the two read as one section.
    $render = [];
    $skipNext = false;
    foreach ($list as $i => $block) {
        if ($skipNext) {
            $skipNext = false;
            continue;
        }

        $data = $block->data;
        $next = $list[$i + 1] ?? null;

        if ($block->type === 'hero' && empty($data['trust']) && $next?->type === 'statsBar') {
            $data['trust'] = collect($next->data['items'] ?? [])
                ->map(fn ($item) => ['icon' => $item['icon'] ?? 'star', 'label' => $item['label'] ?? ''])
                ->all();
            $skipNext = true;
        }

        $render[] = [$block->type, $data];
    }
@endphp

@foreach ($render as [$type, $data])
    @includeIf('blocks.'.$type, ['data' => $data])
@endforeach
