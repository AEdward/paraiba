<section class="py-6">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        @if (! empty($data['heading']))<h2 class="mb-8 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B]">{{ $data['heading'] }}</h2>@endif
        <div class="grid md:grid-cols-2 gap-5">
            @foreach ($data['items'] ?? [] as $item)
                <article class="flex items-start gap-6 rounded-xl border border-slate-200 bg-white p-7 sm:p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                    <x-icon :name="$item['icon'] ?? 'sparkles'" :stroke="1.5" class="size-16 shrink-0 text-blue-600" />
                    <div>
                        <h3 class="text-2xl font-bold tracking-tight text-[#14284B]">{{ $item['title'] ?? '' }}</h3>
                        <p class="mt-2 text-[17px] leading-relaxed text-slate-600">{{ $item['body'] ?? '' }}</p>
                    </div>
                </article>
            @endforeach
        </div>
    </div>
</section>
