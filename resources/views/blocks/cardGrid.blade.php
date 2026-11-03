@php
    $dark = ($data['theme'] ?? 'light') === 'dark';
    $split = ($data['layout'] ?? 'grid') === 'split';
    $cols = (int) ($data['columns'] ?? 3);
@endphp
<section class="py-20 {{ $dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900' }}">
    <div class="mx-auto max-w-[90rem] px-6 lg:px-10">
        <div class="{{ $split ? 'grid lg:grid-cols-[minmax(0,1fr)_2fr] gap-12 items-start' : '' }}">
            <div class="{{ $split ? '' : 'max-w-2xl mb-12' }}">
                @if (! empty($data['eyebrow']))<p class="text-base font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>@endif
                @if (! empty($data['heading']))<h2 class="text-3xl sm:text-4xl font-bold mt-3">{{ $data['heading'] }}</h2>@endif
                @if (! empty($data['body']))<p class="text-lg {{ $dark ? 'text-slate-300' : 'text-slate-600' }} mt-4">{{ $data['body'] }}</p>@endif
                @if (! empty($data['viewAllLabel']))
                    <a href="{{ $data['viewAllHref'] ?? '#' }}" class="inline-flex items-center gap-2 mt-7 rounded-lg bg-blue-600 text-white px-6 py-3 text-base font-semibold hover:bg-blue-700 transition-colors">
                        {{ $data['viewAllLabel'] }} <x-icon name="arrowRight" class="size-4" />
                    </a>
                @endif
            </div>

            @if (! empty($data['imageUrl']))
                <img src="{{ $data['imageUrl'] }}" loading="lazy" decoding="async" class="rounded-xl w-full {{ $split ? '' : 'mb-10' }}" alt="">
            @endif

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-{{ $cols }} gap-6">
                @foreach ($data['items'] ?? [] as $item)
                    <div class="rounded-xl border {{ $dark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white shadow-sm' }} p-7">
                        <span class="flex items-center justify-center size-12 rounded-lg {{ $dark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600' }} mb-5">
                            <x-icon :name="$item['icon'] ?? 'sparkles'" class="size-6" />
                        </span>
                        @if (! empty($item['number']))<span class="text-sm {{ $dark ? 'text-slate-500' : 'text-slate-400' }}">{{ $item['number'] }}</span>@endif
                        <h3 class="text-lg font-semibold">{{ $item['title'] ?? '' }}</h3>
                        <p class="text-base {{ $dark ? 'text-slate-400' : 'text-slate-500' }} mt-1.5">{{ $item['description'] ?? $item['desc'] ?? '' }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</section>
