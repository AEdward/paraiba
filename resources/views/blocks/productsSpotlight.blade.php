<section class="pt-20 pb-8">
    <div class="mx-auto max-w-[90rem] px-6 lg:px-10">
        <div class="max-w-2xl mb-14">
            @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>@endif
            @if (! empty($data['heading']))<h2 class="text-3xl sm:text-4xl font-bold mt-2">{{ $data['heading'] }}</h2>@endif
            @if (! empty($data['body']))<p class="text-lg text-slate-600 mt-3">{{ $data['body'] }}</p>@endif
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
            @foreach ($data['items'] ?? [] as $item)
                @php
                    $isPhone = ($item['device'] ?? 'laptop') === 'phone';
                    $accentClass = ($item['accentStyle'] ?? 'blue') === 'light' ? 'font-normal' : 'text-blue-600';
                @endphp
                <div class="relative flex flex-col sm:flex-row sm:h-64 rounded-2xl bg-gradient-to-br from-[#FCF5EC] to-[#F4E6D3] shadow-sm ring-1 ring-black/5">
                    <div class="sm:w-[45%] shrink-0 p-8 flex flex-col justify-center">
                        <div class="flex items-center gap-3">
                            @if (! empty($item['logoImage']))
                                <img src="{{ $item['logoImage'] }}" alt="" class="size-11 rounded-lg object-contain">
                            @elseif (! empty($item['logoIcon']))
                                <span class="inline-flex items-center justify-center size-11 rounded-lg bg-white text-blue-600 shadow-sm">
                                    <x-icon :name="$item['logoIcon']" class="size-6" />
                                </span>
                            @endif
                            <span class="text-2xl font-bold tracking-tight text-[#14284B] {{ ! empty($item['nameItalic']) ? 'italic' : '' }}">{{ $item['name'] ?? '' }}@if (! empty($item['nameAccent']))<span class="{{ $accentClass }}">{{ $item['nameAccent'] }}</span>@endif</span>
                        </div>
                        <p class="text-xl leading-snug text-slate-800 mt-4">{{ $item['tagline'] ?? '' }}</p>
                        @if (! empty($item['buttonLabel']))
                            <div>
                                <a href="{{ $item['buttonHref'] ?? '#' }}" @if (str_starts_with($item['buttonHref'] ?? '', 'http')) target="_blank" rel="noopener" @endif class="inline-flex items-center gap-2 mt-5 rounded-lg bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors">
                                    {{ $item['buttonLabel'] }} <x-icon name="arrowRight" class="size-4" />
                                </a>
                            </div>
                        @endif
                    </div>

                    @if (! empty($item['image']))
                        <div class="relative h-64 sm:h-auto sm:flex-1">
                            @if ($isPhone)
                                <img src="{{ $item['image'] }}" alt="{{ $item['name'] ?? '' }}" loading="lazy" decoding="async" class="absolute bottom-0 left-0 h-[130%] w-auto max-w-none">

                            @else
                                <img src="{{ $item['image'] }}" alt="{{ $item['name'] ?? '' }}" loading="lazy" decoding="async" class="absolute bottom-6 inset-x-0 mx-auto w-[95%] h-auto">
                            @endif
                        </div>
                    @endif
                </div>
            @endforeach
        </div>

        @if (! empty($data['footnote']))
            <p class="text-center text-base text-slate-500 mt-6">{{ $data['footnote'] }}</p>
        @endif
    </div>
</section>
