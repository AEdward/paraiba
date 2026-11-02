<section class="py-16 bg-slate-900 text-white text-center">
    <div class="mx-auto max-w-2xl px-6">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase opacity-70">{{ $data['eyebrow'] }}</p>@endif
        <h2 class="text-2xl font-bold mt-2">{{ $data['heading'] ?? '' }}</h2>
        @if (! empty($data['body']))<p class="opacity-80 mt-3">{{ $data['body'] }}</p>@endif
        <div class="flex justify-center gap-3 mt-6">
            @if (! empty($data['primaryLabel']))<a href="{{ $data['primaryHref'] ?? '#' }}" class="rounded-lg bg-white text-slate-900 px-6 py-3 text-sm font-semibold">{{ $data['primaryLabel'] }}</a>@endif
            @if (! empty($data['secondaryLabel']))<a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border border-white px-6 py-3 text-sm font-semibold">{{ $data['secondaryLabel'] }}</a>@endif
        </div>
    </div>
</section>
