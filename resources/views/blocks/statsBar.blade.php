<section class="py-10 border-y border-slate-200">
    <div class="mx-auto max-w-5xl px-6 flex flex-wrap justify-around gap-6">
        @foreach ($data['items'] ?? [] as $item)
            <div class="text-center">
                <p class="text-2xl font-bold">{{ $item['value'] ?? '' }}</p>
                <p class="text-sm text-slate-500">{{ $item['label'] ?? '' }}</p>
            </div>
        @endforeach
    </div>
</section>
