<section class="py-14">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        @if (! empty($data['heading']))<h2 class="mb-10 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B]">{{ $data['heading'] }}</h2>@endif
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            @foreach ($data['items'] ?? [] as $item)
                <div>
                    <div class="relative h-0.5 bg-slate-200 mb-6" aria-hidden="true"><span class="absolute inset-y-0 left-0 w-16 bg-blue-600"></span></div>
                    <x-icon :name="$item['icon'] ?? 'sparkles'" :stroke="1.5" class="size-12 text-blue-600" />
                    <h3 class="mt-4 text-2xl font-bold tracking-tight text-[#14284B] leading-tight">{{ $item['title'] ?? '' }}</h3>
                    <p class="mt-3 text-[15px] leading-relaxed text-slate-600">{{ $item['body'] ?? '' }}</p>
                </div>
            @endforeach
        </div>
    </div>
</section>
