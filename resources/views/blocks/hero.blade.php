<section class="{{ ($data['theme'] ?? 'dark') === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900' }} py-20">
    <div class="mx-auto max-w-5xl px-6 {{ ($data['align'] ?? 'left') === 'center' ? 'text-center' : '' }}">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide opacity-70">{{ $data['eyebrow'] }}</p>@endif
        <h1 class="text-4xl sm:text-5xl font-bold mt-3">
            {{ $data['headline'] ?? '' }}
            @if (! empty($data['headlineHighlight']))<span class="text-blue-400">{{ $data['headlineHighlight'] }}</span>@endif
        </h1>
        @if (! empty($data['subhead']))<p class="text-lg opacity-80 mt-4 max-w-xl">{{ $data['subhead'] }}</p>@endif
        <div class="flex flex-wrap gap-3 mt-8 {{ ($data['align'] ?? 'left') === 'center' ? 'justify-center' : '' }}">
            @if (! empty($data['primaryLabel']))<a href="{{ $data['primaryHref'] ?? '#' }}" class="rounded-lg bg-white text-slate-900 px-6 py-3 text-sm font-semibold">{{ $data['primaryLabel'] }}</a>@endif
            @if (! empty($data['secondaryLabel']))<a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border border-current px-6 py-3 text-sm font-semibold">{{ $data['secondaryLabel'] }}</a>@endif
        </div>
    </div>
</section>
