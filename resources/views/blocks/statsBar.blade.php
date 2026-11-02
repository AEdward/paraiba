@php($dark = ($data['theme'] ?? 'light') === 'dark')
<section class="py-10 border-y {{ $dark ? 'bg-slate-950 border-white/10 text-white' : 'border-slate-200' }}">
    <div class="mx-auto max-w-7xl px-6 flex flex-wrap justify-around gap-8">
        @foreach ($data['items'] ?? [] as $item)
            <div class="flex items-center gap-3 text-left">
                <span class="shrink-0 flex items-center justify-center size-10 rounded-full {{ $dark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600' }}">
                    <x-icon :name="$item['icon'] ?? 'star'" class="size-5" />
                </span>
                <span>
                    <span class="block text-sm font-semibold">{{ $item['label'] ?? '' }}</span>
                    @if (! empty($item['sublabel']))<span class="block text-xs {{ $dark ? 'text-slate-400' : 'text-slate-500' }}">{{ $item['sublabel'] }}</span>@endif
                </span>
            </div>
        @endforeach
    </div>
</section>
