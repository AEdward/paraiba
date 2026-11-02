<section class="py-16">
    <div class="mx-auto max-w-5xl px-6">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase text-blue-600">{{ $data['eyebrow'] }}</p>@endif
        @if (! empty($data['heading']))<h2 class="text-2xl font-bold mt-2 mb-8">{{ $data['heading'] }}</h2>@endif
        <div class="grid grid-cols-1 sm:grid-cols-{{ $data['columns'] ?? 3 }} gap-6">
            @foreach ($data['items'] ?? [] as $item)
                <div class="rounded-xl border border-slate-200 p-6">
                    @if (! empty($item['number']))<span class="text-xs text-slate-400">{{ $item['number'] }}</span>@endif
                    <h3 class="font-bold mt-1">{{ $item['title'] ?? '' }}</h3>
                    <p class="text-sm text-slate-500 mt-1">{{ $item['desc'] ?? '' }}</p>
                </div>
            @endforeach
        </div>
    </div>
</section>
