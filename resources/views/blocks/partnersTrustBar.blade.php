@php
    $partners = \App\Models\Partner::orderBy('order')->get();
    $colsClass = [3 => 'lg:grid-cols-3', 4 => 'lg:grid-cols-4', 5 => 'lg:grid-cols-5', 6 => 'lg:grid-cols-6'][min(max($partners->count(), 3), 6)];
@endphp
@if ($partners->isNotEmpty())
<section class="py-12 border-t border-slate-100">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] gap-8 lg:gap-12 items-center">
        <div>
            @if (! empty($data['eyebrow']))<p class="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{{ $data['eyebrow'] }}</p>@endif
            @if (! empty($data['heading']))<h2 class="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#14284B] leading-tight max-w-xs">{{ $data['heading'] }}</h2>@endif
        </div>
        <ul class="grid grid-cols-2 sm:grid-cols-3 {{ $colsClass }} gap-x-10 gap-y-8 items-center">
            @foreach ($partners as $partner)
                @php
                    $logo = $partner->logoSrc();
                    $tag = $partner->website ? 'a' : 'div';
                @endphp
                <li>
                    <{{ $tag }} @if ($partner->website) href="{{ $partner->website }}" target="_blank" rel="noopener" @endif
                        class="group flex h-14 items-center justify-center" title="{{ $partner->name }}">
                        @if ($logo)
                            <img src="{{ $logo }}" alt="{{ $partner->name }}" loading="lazy" decoding="async"
                                class="max-h-12 max-w-[9rem] w-auto object-contain grayscale contrast-125 opacity-70 transition-opacity group-hover:opacity-100">
                        @else
                            <span class="text-lg font-bold text-slate-500 group-hover:text-slate-800">{{ $partner->name }}</span>
                        @endif
                    </{{ $tag }}>
                </li>
            @endforeach
        </ul>
    </div>
</section>
@endif
