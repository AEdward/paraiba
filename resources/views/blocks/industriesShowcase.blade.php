<section class="py-16 bg-slate-50">
    <div class="mx-auto max-w-5xl px-6 grid grid-cols-2 gap-10 items-center">
        <div>
            @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase text-blue-600">{{ $data['eyebrow'] }}</p>@endif
            <h2 class="text-2xl font-bold mt-2">{{ $data['heading'] ?? '' }}</h2>
            <p class="text-slate-600 mt-3">{{ $data['body'] ?? '' }}</p>
            <ul class="mt-5 space-y-2">
                @foreach ($data['items'] ?? [] as $item)
                    <li class="text-sm text-slate-700">{{ $item['label'] ?? '' }}</li>
                @endforeach
            </ul>
            @if (! empty($data['ctaLabel']))
                <a href="{{ $data['ctaHref'] ?? '#' }}" class="inline-block mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white">{{ $data['ctaLabel'] }}</a>
            @endif
        </div>
        @if (! empty($data['imageUrl']))
            <img src="{{ $data['imageUrl'] }}" class="rounded-xl w-full">
        @endif
    </div>
</section>
