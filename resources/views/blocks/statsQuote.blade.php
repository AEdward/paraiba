<section class="py-16">
    <div class="mx-auto max-w-5xl px-6 grid grid-cols-2 gap-10">
        <div class="grid grid-cols-2 gap-6">
            @foreach ($data['items'] ?? [] as $item)
                <div><p class="text-2xl font-bold">{{ $item['value'] ?? '' }}</p><p class="text-sm text-slate-500">{{ $item['label'] ?? '' }}</p></div>
            @endforeach
        </div>
        <blockquote class="border-l-4 border-slate-900 pl-6">
            <p class="text-lg italic">{{ $data['quote'] ?? '' }}</p>
            @if (! empty($data['attribution']))<p class="text-sm text-slate-500 mt-3">— {{ $data['attribution'] }}</p>@endif
        </blockquote>
    </div>
</section>
