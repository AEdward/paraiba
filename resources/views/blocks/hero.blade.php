@php($dark = ($data['theme'] ?? 'light') === 'dark')
<section class="{{ $dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900' }} overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div class="{{ ($data['align'] ?? 'left') === 'center' ? 'text-center mx-auto' : '' }}">
            @if (! empty($data['eyebrow']))
                <p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>
            @endif
            <h1 class="text-4xl sm:text-5xl font-bold mt-3 leading-tight">
                {{ $data['headline'] ?? '' }}
                @if (! empty($data['headlineHighlight']))<span class="text-blue-600">{{ $data['headlineHighlight'] }}</span>@endif
                @if (! empty($data['headline2']))<br>{{ $data['headline2'] }}@endif
            </h1>
            @if (! empty($data['subhead']))
                <p class="text-lg {{ $dark ? 'text-slate-300' : 'text-slate-600' }} mt-5 max-w-xl">{{ $data['subhead'] }}</p>
            @endif
            <div class="flex flex-wrap gap-3 mt-8 {{ ($data['align'] ?? 'left') === 'center' ? 'justify-center' : '' }}">
                @if (! empty($data['primaryLabel']))
                    <a href="{{ $data['primaryHref'] ?? '#' }}" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors">
                        {{ $data['primaryLabel'] }}
                    </a>
                @endif
                @if (! empty($data['secondaryLabel']))
                    <a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border {{ $dark ? 'border-white/30' : 'border-slate-300' }} px-6 py-3 text-sm font-semibold hover:bg-slate-50 {{ $dark ? 'hover:bg-white/5' : '' }} transition-colors">
                        {{ $data['secondaryLabel'] }}
                    </a>
                @endif
            </div>
        </div>

        @if (! empty($data['mockupImage']))
            <div class="flex items-center justify-center">
                <img src="{{ $data['mockupImage'] }}" alt="" class="w-full max-w-xl h-auto">
            </div>
        @endif
    </div>
</section>
