@php
    $dark = ($data['theme'] ?? 'light') === 'dark';
    $compact = ! empty($data['compact']);
@endphp
@if ($compact)
<section class="py-8 {{ $dark ? 'bg-[#0B1F3F] text-white' : 'bg-slate-50 text-slate-900' }}">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 grid lg:grid-cols-[2fr_3fr] gap-10 items-center">
        <div>
            <h2 class="text-3xl font-bold leading-tight max-w-sm">{{ $data['heading'] ?? '' }}</h2>
            @if (! empty($data['body']))<p class="{{ $dark ? 'text-slate-200' : 'text-slate-600' }} mt-3 max-w-md">{{ $data['body'] }}</p>@endif
        </div>
        @if (! empty($data['photoUrl']))
            <div class="rounded-xl overflow-hidden aspect-[4/1]">
                <img src="{{ $data['photoUrl'] }}" loading="lazy" decoding="async" class="w-full h-full object-cover" alt="">
            </div>
        @endif
    </div>
</section>
@else
<section class="py-20 {{ $dark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900' }}">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
            @if (! empty($data['eyebrow']))<p class="text-base font-semibold uppercase tracking-wide text-blue-400">{{ $data['eyebrow'] }}</p>@endif
            <h2 class="text-3xl sm:text-4xl font-bold mt-3">{{ $data['heading'] ?? '' }}</h2>
            @if (! empty($data['body']))<p class="text-lg {{ $dark ? 'text-slate-300' : 'text-slate-600' }} mt-4 max-w-md">{{ $data['body'] }}</p>@endif

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                @foreach ($data['items'] ?? [] as $item)
                    <div class="flex flex-col items-center text-center gap-2 rounded-xl {{ $dark ? 'bg-white/5' : 'bg-white' }} p-4">
                        <span class="flex items-center justify-center size-10 rounded-lg {{ $dark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600' }}">
                            <x-icon :name="$item['icon'] ?? 'sparkles'" class="size-5" />
                        </span>
                        <span class="text-xs font-medium">{{ $item['label'] ?? '' }}</span>
                    </div>
                @endforeach
            </div>

            @if (! empty($data['buttonLabel']))
                <a href="{{ $data['buttonHref'] ?? '#' }}" class="inline-flex items-center gap-2 mt-8 rounded-lg bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors">
                    {{ $data['buttonLabel'] }} <x-icon name="arrowRight" class="size-4" />
                </a>
            @endif
        </div>

        @if (! empty($data['photoUrl']))
            <div class="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img src="{{ $data['photoUrl'] }}" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover" alt="">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent"></div>
                @if (! empty($data['photoHeading']))
                    <p class="absolute bottom-6 left-6 right-6 text-white text-xl font-semibold">{{ $data['photoHeading'] }}</p>
                @endif
            </div>
        @endif
    </div>
</section>
@endif
