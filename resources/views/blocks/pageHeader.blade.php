@php
    $hasImage = ! empty($data['image']);
@endphp
<section class="bg-gradient-to-b from-[#F7FAFF] to-white">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 pt-6 pb-10">
        @if (! empty($data['breadcrumb']))
            <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
                <a href="{{ route('home') }}" class="hover:text-blue-600 transition-colors">Home</a>
                <span class="mx-2 text-slate-400">/</span>
                <span class="font-semibold text-blue-600" aria-current="page">{{ $data['breadcrumb'] }}</span>
            </nav>
        @endif

        <div class="{{ $hasImage ? 'grid lg:grid-cols-2 gap-10 lg:gap-14 items-center' : '' }}">
            <div>
                @if (! empty($data['eyebrow']))
                    <p class="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{{ $data['eyebrow'] }}</p>
                @endif
                <h1 class="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14284B] leading-[1.05]">
                    @if (! empty($data['headlineTop'])){{ $data['headlineTop'] }}<br>@endif{{ $data['headline'] ?? '' }}@if (! empty($data['headlineHighlight']))<span class="text-blue-600">{{ $data['headlineHighlight'] }}</span>@endif
                </h1>
                @if (! empty($data['subhead']))
                    <p class="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl">{{ $data['subhead'] }}</p>
                @endif
                <span class="block mt-8 h-0.5 w-16 bg-blue-600" aria-hidden="true"></span>
            </div>

            @if ($hasImage)
                <div class="mt-6 lg:mt-8 overflow-hidden rounded-2xl aspect-[3/2] shadow-sm">
                    <img src="{{ $data['image'] }}" alt="{{ $data['imageAlt'] ?? '' }}" loading="eager" fetchpriority="high" class="h-full w-full object-cover">
                </div>
            @endif
        </div>
    </div>
</section>
