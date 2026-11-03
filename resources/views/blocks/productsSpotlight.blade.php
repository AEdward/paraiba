<section class="py-16">
    <div class="mx-auto max-w-7xl px-6">
        <div class="max-w-2xl mb-10">
            @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>@endif
            @if (! empty($data['heading']))<h2 class="text-2xl sm:text-3xl font-bold mt-2">{{ $data['heading'] }}</h2>@endif
            @if (! empty($data['body']))<p class="text-slate-600 mt-3">{{ $data['body'] }}</p>@endif
        </div>

        <div class="grid sm:grid-cols-2 gap-6">
            @foreach ($data['items'] ?? [] as $item)
                <div class="relative rounded-2xl overflow-hidden p-8 pb-0" style="background-color: #FBF0E2;">
                    <div class="flex items-center gap-2 mb-4">
                        @if (! empty($item['logoImage']))
                            <img src="{{ $item['logoImage'] }}" class="h-6" alt="">
                        @endif
                        <span class="font-bold text-slate-900">{{ $item['name'] ?? '' }}</span>
                    </div>
                    <h3 class="text-xl font-semibold text-slate-900 max-w-xs">{{ $item['tagline'] ?? '' }}</h3>
                    @if (! empty($item['buttonLabel']))
                        <a href="{{ $item['buttonHref'] ?? '#' }}" class="inline-flex items-center gap-2 mt-5 rounded-lg bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700 transition-colors">
                            {{ $item['buttonLabel'] }} <x-icon name="arrowRight" class="size-4" />
                        </a>
                    @endif

                    @if (! empty($item['image']))
                        <div class="mt-6 -mb-0 flex justify-end">
                            @if (($item['device'] ?? 'laptop') === 'phone')
                                <div class="spotlight-phone" style="background-image: url('{{ $item['image'] }}')"></div>
                            @else
                                <div class="spotlight-laptop">
                                    <div class="spotlight-laptop-screen" style="background-image: url('{{ $item['image'] }}')"></div>
                                    <div class="spotlight-laptop-base"></div>
                                </div>
                            @endif
                        </div>
                    @endif
                </div>
            @endforeach
        </div>

        @if (! empty($data['footnote']))
            <p class="text-center text-sm text-slate-500 mt-8">{{ $data['footnote'] }}</p>
        @endif
    </div>
</section>

@once
    <style>
        .spotlight-laptop { width: 92%; }
        .spotlight-laptop-screen {
            width: 100%;
            aspect-ratio: 1357 / 645;
            background-color: #f8fafc;
            background-size: cover;
            background-position: top center;
            border-radius: 8px 8px 2px 2px;
            border: 6px solid #1e293b;
            box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.3);
        }
        .spotlight-laptop-base {
            width: 106%;
            margin-left: -3%;
            height: 8px;
            background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
            border-radius: 0 0 6px 6px;
        }
        .spotlight-phone {
            width: 46%;
            aspect-ratio: 853 / 1844;
            background-color: #f8fafc;
            background-size: cover;
            background-position: top center;
            border-radius: 16px 16px 2px 2px;
            border: 6px solid #1e293b;
            border-bottom: none;
            box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.3);
        }
    </style>
@endonce
