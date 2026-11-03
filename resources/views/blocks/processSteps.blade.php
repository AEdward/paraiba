<section class="py-10">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        @if (! empty($data['heading']))<h2 class="text-4xl font-extrabold tracking-tight text-[#14284B] mb-6">{{ $data['heading'] }}</h2>@endif

        <div class="grid sm:grid-cols-3 gap-y-6 sm:divide-x divide-slate-200">
            @foreach ($data['items'] ?? [] as $item)
                <div class="flex items-start gap-5 {{ $loop->first ? 'sm:pr-8' : ($loop->last ? 'sm:pl-10' : 'sm:px-10') }} {{ $loop->first ? 'pl-5' : '' }}">
                    <span class="shrink-0 inline-flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-semibold text-base px-4 py-1.5">
                        {{ $item['number'] ?? '' }}
                    </span>
                    <div>
                        <h3 class="text-lg font-semibold text-[#14284B] leading-tight">{{ $item['title'] ?? '' }}</h3>
                        <p class="text-sm text-slate-600 mt-1 leading-snug max-w-[16rem]">{{ $item['description'] ?? '' }}</p>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>
