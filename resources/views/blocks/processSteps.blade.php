<section class="py-16">
    <div class="mx-auto max-w-7xl px-6">
        @if (! empty($data['heading']))<h2 class="text-2xl sm:text-3xl font-bold text-slate-900 mb-10">{{ $data['heading'] }}</h2>@endif

        <div class="grid sm:grid-cols-3 gap-10">
            @foreach ($data['items'] ?? [] as $item)
                <div>
                    <span class="inline-flex items-center justify-center size-9 rounded-full bg-blue-50 text-blue-600 font-bold text-sm">
                        {{ $item['number'] ?? '' }}
                    </span>
                    <h3 class="font-semibold text-slate-900 mt-4">{{ $item['title'] ?? '' }}</h3>
                    <p class="text-sm text-slate-500 mt-1">{{ $item['description'] ?? '' }}</p>
                </div>
            @endforeach
        </div>
    </div>
</section>
