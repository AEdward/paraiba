@php
    $dark = ($data['theme'] ?? 'light') === 'dark';
@endphp
<section class="py-8 border-y {{ $dark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200' }}">
    <div class="mx-auto max-w-[90rem] px-6 lg:px-10 flex flex-wrap items-center justify-center">
        @foreach ($data['items'] ?? [] as $i => $item)
            @if ($i > 0)
                <span class="hidden sm:block h-7 w-px {{ $dark ? 'bg-white/10' : 'bg-slate-300' }} mx-7 lg:mx-10"></span>
            @endif
            <div class="flex items-center gap-3 px-2 py-2">
                <x-icon :name="$item['icon'] ?? 'star'" class="size-6 text-blue-600" />
                <span>
                    <span class="block text-base font-semibold">{{ $item['label'] ?? '' }}</span>
                    @if (! empty($item['sublabel']))<span class="block text-sm {{ $dark ? 'text-slate-400' : 'text-slate-500' }}">{{ $item['sublabel'] }}</span>@endif
                </span>
            </div>
        @endforeach
    </div>
</section>
