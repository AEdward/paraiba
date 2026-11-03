<section class="pb-4">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 rounded-xl bg-gradient-to-r from-[#EEF4FF] to-[#E3EDFF] px-7 py-6">
            <div class="flex items-center gap-4 shrink-0">
                <x-icon :name="$data['icon'] ?? 'sparkle'" :stroke="1.6" class="size-9 text-blue-600" />
                <h2 class="text-2xl font-bold tracking-tight text-blue-600">{{ $data['heading'] ?? '' }}</h2>
            </div>
            <span class="hidden sm:block w-px self-stretch bg-blue-200" aria-hidden="true"></span>
            @if (! empty($data['body']))
                <p class="text-[15px] text-slate-700 max-w-2xl">{{ $data['body'] }}</p>
            @endif
        </div>
    </div>
</section>
