<section class="py-20">
    <div class="mx-auto max-w-[90rem] px-6 lg:px-10">
        @if (! empty($data['heading']))<h2 class="text-3xl sm:text-4xl font-bold text-slate-900 mb-12">{{ $data['heading'] }}</h2>@endif

        <div class="grid sm:grid-cols-3 gap-12">
            @foreach ($data['items'] ?? [] as $item)
                <div>
                    <span class="inline-flex items-center justify-center size-10 rounded-full bg-blue-50 text-blue-600 font-bold text-base">
                        {{ $item['number'] ?? '' }}
                    </span>
                    <h3 class="text-lg font-semibold text-slate-900 mt-5">{{ $item['title'] ?? '' }}</h3>
                    <p class="text-base text-slate-500 mt-1.5">{{ $item['description'] ?? '' }}</p>
                </div>
            @endforeach
        </div>
    </div>
</section>
