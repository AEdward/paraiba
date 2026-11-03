@php
    $dark = ($data['theme'] ?? 'light') === 'dark';
    $trust = $data['trust'] ?? [];
@endphp
<section class="{{ $dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900' }} overflow-hidden {{ $trust ? 'lg:min-h-[calc(100svh-69px)] flex flex-col' : '' }}">
    <div class="{{ $trust ? 'flex-1 w-full' : '' }} mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 pt-6 pb-6 lg:pt-6 lg:pb-6 grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-8 items-center">
        <div class="{{ ($data['align'] ?? 'left') === 'center' ? 'text-center mx-auto' : '' }}">
            @if (! empty($data['eyebrow']))
                <p class="text-sm lg:text-base font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>
            @endif
            <h1 class="text-4xl sm:text-5xl lg:text-[clamp(2rem,2.7vw,2.5rem)] font-bold mt-3 leading-[1.1] tracking-tight">
                {{ $data['headline'] ?? '' }}
                @if (! empty($data['headlineHighlight']))<span class="text-blue-600">{{ $data['headlineHighlight'] }}</span>@endif
                @if (! empty($data['headline2']))<br>{{ $data['headline2'] }}@endif
            </h1>
            @if (! empty($data['subhead']))
                <p class="text-lg lg:text-xl {{ $dark ? 'text-slate-300' : 'text-slate-600' }} mt-4 max-w-xl">{{ $data['subhead'] }}</p>
            @endif
            <div class="flex flex-wrap gap-4 mt-7 {{ ($data['align'] ?? 'left') === 'center' ? 'justify-center' : '' }}">
                @if (! empty($data['primaryLabel']))
                    <a href="{{ $data['primaryHref'] ?? '#' }}" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-7 py-3.5 text-base font-semibold hover:bg-blue-700 transition-colors">
                        {{ $data['primaryLabel'] }}
                    </a>
                @endif
                @if (! empty($data['secondaryLabel']))
                    <a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border {{ $dark ? 'border-white/30' : 'border-slate-300' }} px-7 py-3.5 text-base font-semibold hover:bg-slate-50 {{ $dark ? 'hover:bg-white/5' : '' }} transition-colors">
                        {{ $data['secondaryLabel'] }}
                    </a>
                @endif
            </div>
        </div>

        @if (! empty($data['mockupImage']))
            @php
                $heroImageSize = ! str_starts_with($data['mockupImage'], 'http')
                    ? @getimagesize(public_path($data['mockupImage']))
                    : false;
            @endphp
            <div class="flex items-center justify-center">
                <img
                    src="{{ $data['mockupImage'] }}"
                    alt=""
                    loading="eager"
                    fetchpriority="high"
                    @if ($heroImageSize) width="{{ $heroImageSize[0] }}" height="{{ $heroImageSize[1] }}" @endif
                    class="w-full h-auto lg:max-h-[50svh] lg:w-auto object-contain"
                >
            </div>
        @endif
    </div>

    @if ($trust)
        <div class="w-full mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 pb-8 lg:pb-10">
            <ul class="grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:divide-x {{ $dark ? 'divide-white/15' : 'divide-slate-200' }}">
                @foreach ($trust as $item)
                    <li class="flex items-center gap-3 {{ $loop->first ? 'lg:pr-6' : 'lg:px-6 lg:justify-center' }}">
                        <x-icon :name="$item['icon'] ?? 'star'" :stroke="1.7" class="size-7 shrink-0 text-blue-600" />
                        <span class="text-base font-semibold {{ $dark ? 'text-white' : 'text-[#14284B]' }}">{{ $item['label'] ?? '' }}</span>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif
</section>
