@php
    $dark = ($data['theme'] ?? 'dark') === 'dark';
@endphp
@if (($data['style'] ?? '') === 'center')
<section class="py-12">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 text-center">
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B]">{{ $data['heading'] ?? '' }}</h2>
        @if (! empty($data['body']))<p class="mt-3 text-lg text-slate-600">{{ $data['body'] }}</p>@endif
        @if (! empty($data['buttonLabel']))
            <a href="{{ $data['buttonHref'] ?? '#' }}" class="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-7 py-3.5 text-base font-semibold hover:bg-blue-700 transition-colors">
                {{ $data['buttonLabel'] }} <x-icon name="arrowRight" class="size-5" />
            </a>
        @endif
    </div>
</section>
@elseif (($data['style'] ?? '') === 'strip')
<section class="py-10">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-[#14284B]">{{ $data['heading'] ?? '' }}</h2>
        @if (! empty($data['buttonLabel']))
            <a href="{{ $data['buttonHref'] ?? '#' }}" class="inline-flex items-center rounded-lg bg-blue-600 text-white px-7 py-3.5 text-base font-semibold hover:bg-blue-700 transition-colors">{{ $data['buttonLabel'] }}</a>
        @endif
    </div>
</section>
@else
<section class="py-6">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        <div class="relative overflow-hidden rounded-2xl px-8 sm:px-10 py-6 flex flex-wrap items-center justify-between gap-6 {{ $dark ? 'bg-gradient-to-r from-[#1E5BE6] via-[#2563EB] to-[#3B82F6] text-white' : 'bg-slate-50 text-slate-900' }}">
            @if ($dark)
                <svg class="pointer-events-none absolute inset-0 h-full w-full opacity-25" viewBox="0 0 800 100" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0 80 C 200 20, 400 120, 800 30 L800 100 L0 100 Z" fill="white" fill-opacity="0.15"/>
                    <path d="M300 100 C 450 40, 600 90, 800 10" stroke="white" stroke-opacity="0.35" stroke-width="1.5" fill="none"/>
                </svg>
            @endif
            <div class="relative">
                @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide {{ $dark ? 'text-blue-100' : 'text-blue-600' }}">{{ $data['eyebrow'] }}</p>@endif
                <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">{{ $data['heading'] ?? '' }}</h2>
                @if (! empty($data['body']))<p class="{{ $dark ? 'text-blue-50' : 'text-slate-600' }} mt-1 max-w-xl">{{ $data['body'] }}</p>@endif
            </div>
            <div class="relative flex flex-wrap gap-3">
                @if (! empty($data['buttonLabel']))
                    <a href="{{ $data['buttonHref'] ?? '#' }}" class="inline-flex items-center gap-2 rounded-lg {{ $dark ? 'bg-white text-[#14284B]' : 'bg-blue-600 text-white' }} px-6 py-3 text-base font-semibold hover:opacity-90 transition-opacity">
                        {{ $data['buttonLabel'] }} <x-icon name="arrowUpRight" class="size-4" />
                    </a>
                @endif
                @if (! empty($data['secondaryLabel']))
                    <a href="{{ $data['secondaryHref'] ?? '#' }}" class="rounded-lg border {{ $dark ? 'border-white/40 text-white' : 'border-slate-300' }} px-6 py-3 text-base font-semibold">{{ $data['secondaryLabel'] }}</a>
                @endif
            </div>
        </div>
    </div>
</section>
@endif
