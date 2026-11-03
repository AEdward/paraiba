<section class="py-12">
    <div class="mx-auto max-w-[90rem] px-6 lg:px-10">
        @if (! empty($data['heading']))
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B] mb-8">{{ $data['heading'] }}</h2>
        @endif

        <div class="grid md:grid-cols-2 gap-4">
            @foreach ($data['items'] ?? [] as $item)
                <article class="flex gap-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                    <x-icon :name="$item['icon'] ?? 'sparkles'" :stroke="1.4" class="size-16 shrink-0 text-blue-600" />
                    <div class="min-w-0">
                        <h3 class="text-2xl font-bold tracking-tight text-[#14284B]">{{ $item['title'] ?? '' }}</h3>
                        @if (! empty($item['challenge']))
                            <p class="mt-5 text-xs font-bold uppercase tracking-[0.15em] text-blue-600">{{ $data['challengeLabel'] ?? 'The challenge' }}</p>
                            <p class="mt-1 text-[15px] leading-snug text-slate-700">{{ $item['challenge'] }}</p>
                        @endif
                        @if (! empty($item['build']))
                            <p class="mt-4 text-xs font-bold uppercase tracking-[0.15em] text-blue-600">{{ $data['buildLabel'] ?? 'What we can build' }}</p>
                            <p class="mt-1 text-[15px] leading-snug text-slate-700">{{ $item['build'] }}</p>
                        @endif
                    </div>
                </article>
            @endforeach
        </div>
    </div>
</section>
