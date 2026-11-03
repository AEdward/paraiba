<section class="py-8">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        <div class="rounded-2xl bg-gradient-to-r from-[#EEF4FF] to-[#E6EEFF] px-7 sm:px-10 py-9">
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B]">{{ $data['heading'] ?? '' }}</h2>
            @if (! empty($data['body']))<p class="mt-3 text-lg text-slate-700">{{ $data['body'] }}</p>@endif
            @if (! empty($data['items']))
                <ul class="mt-7 grid sm:grid-cols-3 gap-y-4 sm:divide-x divide-blue-200">
                    @foreach ($data['items'] as $item)
                        <li class="flex items-center gap-3 sm:justify-center sm:px-4">
                            <x-icon :name="$item['icon'] ?? 'sparkles'" :stroke="1.7" class="size-8 shrink-0 text-blue-600" />
                            <span class="text-base font-semibold text-[#14284B]">{{ $item['label'] ?? '' }}</span>
                        </li>
                    @endforeach
                </ul>
            @endif
        </div>
    </div>
</section>
