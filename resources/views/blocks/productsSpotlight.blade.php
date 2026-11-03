<section class="py-20">
    <div class="mx-auto max-w-[90rem] px-6 lg:px-10">
        <div class="max-w-2xl mb-12">
            @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>@endif
            @if (! empty($data['heading']))<h2 class="text-3xl sm:text-4xl font-bold mt-2">{{ $data['heading'] }}</h2>@endif
            @if (! empty($data['body']))<p class="text-lg text-slate-600 mt-3">{{ $data['body'] }}</p>@endif
        </div>

        <div class="grid sm:grid-cols-2 gap-8">
            @foreach ($data['items'] ?? [] as $item)
                <div class="relative rounded-2xl overflow-hidden p-8 flex items-center gap-4" style="background-color: #FBF0E2; min-height: 20rem;">
                    <div class="w-2/5 shrink-0">
                        <div class="flex items-center gap-2 mb-4">
                            @if (! empty($item['logoImage']))
                                <img src="{{ $item['logoImage'] }}" alt="" class="size-7 rounded-md object-contain">
                            @elseif (! empty($item['logoIcon']))
                                <span class="inline-flex items-center justify-center size-7 rounded-md bg-white text-blue-600 shadow-sm">
                                    <x-icon :name="$item['logoIcon']" class="size-4" />
                                </span>
                            @endif
                            <span class="font-bold text-slate-900">{{ $item['name'] ?? '' }}</span>
                        </div>
                        <h3 class="text-xl font-semibold text-slate-900">{{ $item['tagline'] ?? '' }}</h3>
                        @if (! empty($item['buttonLabel']))
                            <a href="{{ $item['buttonHref'] ?? '#' }}" class="inline-flex items-center gap-2 mt-5 rounded-lg bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors">
                                {{ $item['buttonLabel'] }} <x-icon name="arrowRight" class="size-4" />
                            </a>
                        @endif
                    </div>

                    @if (! empty($item['image']))
                        @php
                            $spotlightImageSize = ! str_starts_with($item['image'], 'http')
                                ? @getimagesize(public_path($item['image']))
                                : false;
                        @endphp
                        <div class="flex-1 flex items-center justify-center">
                            <img
                                src="{{ $item['image'] }}"
                                alt="{{ $item['name'] ?? '' }}"
                                loading="lazy"
                                decoding="async"
                                @if ($spotlightImageSize) width="{{ $spotlightImageSize[0] }}" height="{{ $spotlightImageSize[1] }}" @endif
                                class="{{ ($item['device'] ?? 'laptop') === 'phone' ? 'w-44 sm:w-48' : 'w-full' }} h-auto"
                            >
                        </div>
                    @endif
                </div>
            @endforeach
        </div>

        @if (! empty($data['footnote']))
            <p class="text-center text-base text-slate-500 mt-8">{{ $data['footnote'] }}</p>
        @endif
    </div>
</section>
