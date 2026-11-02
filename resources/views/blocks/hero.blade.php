@php($dark = ($data['theme'] ?? 'light') === 'dark')
<section class="{{ $dark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900' }} overflow-hidden">
    <div class="mx-auto max-w-7xl px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div class="{{ ($data['align'] ?? 'left') === 'center' ? 'text-center mx-auto' : '' }}">
            @if (! empty($data['eyebrow']))
                <p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>
            @endif
            <h1 class="text-4xl sm:text-5xl font-bold mt-3 leading-tight">
                {{ $data['headline'] ?? '' }}
                @if (! empty($data['headlineHighlight']))<span class="text-blue-600">{{ $data['headlineHighlight'] }}</span>@endif
            </h1>
            @if (! empty($data['subhead']))
                <p class="text-lg {{ $dark ? 'text-slate-300' : 'text-slate-600' }} mt-5 max-w-xl">{{ $data['subhead'] }}</p>
            @endif
            <div class="flex flex-wrap gap-3 mt-8 {{ ($data['align'] ?? 'left') === 'center' ? 'justify-center' : '' }}">
                @if (! empty($data['primaryLabel']))
                    <a href="{{ $data['primaryHref'] ?? '#' }}" class="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors">
                        {{ $data['primaryLabel'] }} <x-icon name="arrowRight" class="size-4" />
                    </a>
                @endif
                @if (! empty($data['secondaryLabel']))
                    <a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border {{ $dark ? 'border-white/30' : 'border-slate-300' }} px-6 py-3 text-sm font-semibold hover:bg-slate-50 {{ $dark ? 'hover:bg-white/5' : '' }} transition-colors">
                        {{ $data['secondaryLabel'] }}
                    </a>
                @endif
            </div>
        </div>

        <div class="relative">
            @if (! empty($data['mockupImage']))
                <img src="{{ $data['mockupImage'] }}" alt="" class="w-full rounded-2xl">
            @endif

            @if (! empty($data['sideList']))
                <div class="hidden lg:flex flex-col gap-3 absolute top-0 -right-4 translate-x-1/3">
                    @foreach ($data['sideList'] as $item)
                        <div class="flex items-center gap-3 bg-white rounded-xl shadow-lg shadow-slate-900/5 border border-slate-100 px-4 py-3 w-64">
                            <span class="shrink-0 flex items-center justify-center size-9 rounded-lg bg-blue-50 text-blue-600">
                                <x-icon :name="$item['icon'] ?? 'sparkles'" class="size-5" />
                            </span>
                            <span>
                                <span class="block text-sm font-semibold text-slate-900">{{ $item['title'] ?? '' }}</span>
                                <span class="block text-xs text-slate-500">{{ $item['subtitle'] ?? '' }}</span>
                            </span>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </div>
</section>
