<section class="py-12">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        @if (! empty($data['heading']))<h2 class="mb-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B]">{{ $data['heading'] }}</h2>@endif
        <ul class="space-y-3">
            @foreach ($data['items'] ?? [] as $item)
                @php
                    $external = str_starts_with($item['href'] ?? '', 'http');
                @endphp
                <li class="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                    <x-icon :name="$item['icon'] ?? 'sparkles'" :stroke="1.6" class="size-10 shrink-0 text-blue-600" />
                    <span class="hidden sm:block h-10 w-px bg-slate-200" aria-hidden="true"></span>
                    <div class="min-w-0 flex-1">
                        <p class="text-lg font-bold text-[#14284B]">{{ $item['name'] ?? '' }}</p>
                        <p class="text-[15px] text-slate-600">{{ $item['description'] ?? '' }}</p>
                    </div>
                    @if (! empty($item['linkLabel']))
                        <a href="{{ $item['href'] ?? '#' }}" @if ($external) target="_blank" rel="noopener" @endif class="inline-flex items-center gap-2 text-[15px] font-semibold text-blue-600 hover:text-blue-700">
                            {{ $item['linkLabel'] }} <x-icon name="arrowUpRight" class="size-4" />
                        </a>
                    @endif
                </li>
            @endforeach
        </ul>
        @if (! empty($data['footnote']))<p class="mt-4 text-sm text-slate-500">{{ $data['footnote'] }}</p>@endif
    </div>
</section>
