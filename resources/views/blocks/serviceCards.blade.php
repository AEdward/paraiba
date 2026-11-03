<section class="py-12">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        @if (! empty($data['heading']) || ! empty($data['body']))
            <div class="max-w-2xl mb-8">
                @if (! empty($data['eyebrow']))<p class="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{{ $data['eyebrow'] }}</p>@endif
                @if (! empty($data['heading']))<h2 class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B]">{{ $data['heading'] }}</h2>@endif
                @if (! empty($data['body']))<p class="mt-3 text-lg text-slate-600">{{ $data['body'] }}</p>@endif
            </div>
        @endif

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            @foreach ($data['items'] ?? [] as $item)
                <article class="flex flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-md">
                    <span class="inline-flex size-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <x-icon :name="$item['icon'] ?? 'sparkles'" :stroke="1.6" class="size-7" />
                    </span>
                    <h3 class="mt-5 text-xl font-bold tracking-tight text-[#14284B]">{{ $item['title'] ?? '' }}</h3>
                    @if (! empty($item['description']))
                        <p class="mt-2 text-[15px] leading-relaxed text-slate-600">{{ $item['description'] }}</p>
                    @endif
                    @if (! empty($item['points']))
                        <ul class="mt-5 space-y-2 border-t border-slate-100 pt-5">
                            @foreach ($item['points'] as $point)
                                <li class="flex items-start gap-2.5 text-[15px] text-slate-700">
                                    <x-icon name="check" :stroke="2.5" class="mt-0.5 size-4 shrink-0 text-blue-600" />
                                    <span>{{ $point }}</span>
                                </li>
                            @endforeach
                        </ul>
                    @endif
                </article>
            @endforeach
        </div>
    </div>
</section>
