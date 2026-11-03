@php
    $dark = ($data['theme'] ?? 'dark') === 'dark';
@endphp
<section class="py-14 {{ $dark ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white' : 'bg-slate-50 text-slate-900' }}">
    <div class="mx-auto max-w-6xl px-6 flex flex-wrap items-center justify-between gap-6">
        <div>
            @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide {{ $dark ? 'text-blue-100' : 'text-blue-600' }}">{{ $data['eyebrow'] }}</p>@endif
            <h2 class="text-2xl font-bold mt-1">{{ $data['heading'] ?? '' }}</h2>
            @if (! empty($data['body']))<p class="{{ $dark ? 'text-blue-50' : 'text-slate-600' }} mt-2 max-w-xl">{{ $data['body'] }}</p>@endif
        </div>
        <div class="flex flex-wrap gap-3">
            @if (! empty($data['buttonLabel']))
                <a href="{{ $data['buttonHref'] ?? '#' }}" class="rounded-lg {{ $dark ? 'bg-white text-blue-700' : 'bg-blue-600 text-white' }} px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity">{{ $data['buttonLabel'] }}</a>
            @endif
            @if (! empty($data['secondaryLabel']))
                <a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border {{ $dark ? 'border-white/40 text-white' : 'border-slate-300' }} px-6 py-3 text-sm font-semibold">{{ $data['secondaryLabel'] }}</a>
            @endif
        </div>
    </div>
</section>
