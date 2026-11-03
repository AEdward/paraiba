@php
    $dark = ($data['theme'] ?? 'dark') === 'dark';
@endphp
<section class="py-16 {{ $dark ? 'bg-gradient-to-r from-blue-700 to-blue-500 text-white' : 'bg-slate-50 text-slate-900' }}">
    <div class="mx-auto max-w-[90rem] px-6 lg:px-10 flex flex-wrap items-center justify-between gap-8">
        <div>
            @if (! empty($data['eyebrow']))<p class="text-base font-semibold uppercase tracking-wide {{ $dark ? 'text-blue-100' : 'text-blue-600' }}">{{ $data['eyebrow'] }}</p>@endif
            <h2 class="text-3xl font-bold mt-1">{{ $data['heading'] ?? '' }}</h2>
            @if (! empty($data['body']))<p class="text-lg {{ $dark ? 'text-blue-50' : 'text-slate-600' }} mt-2 max-w-xl">{{ $data['body'] }}</p>@endif
        </div>
        <div class="flex flex-wrap gap-4">
            @if (! empty($data['buttonLabel']))
                <a href="{{ $data['buttonHref'] ?? '#' }}" class="rounded-lg {{ $dark ? 'bg-white text-blue-700' : 'bg-blue-600 text-white' }} px-7 py-3.5 text-base font-semibold hover:opacity-90 transition-opacity">{{ $data['buttonLabel'] }}</a>
            @endif
            @if (! empty($data['secondaryLabel']))
                <a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border {{ $dark ? 'border-white/40 text-white' : 'border-slate-300' }} px-7 py-3.5 text-base font-semibold">{{ $data['secondaryLabel'] }}</a>
            @endif
        </div>
    </div>
</section>
