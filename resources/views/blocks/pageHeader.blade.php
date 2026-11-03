<section class="bg-gradient-to-b from-[#F7FAFF] to-white">
    <div class="mx-auto max-w-[90rem] px-6 lg:px-10 pt-6 pb-10">
        @if (! empty($data['breadcrumb']))
            <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
                <a href="{{ route('home') }}" class="hover:text-blue-600 transition-colors">Home</a>
                <span class="mx-2 text-slate-400">/</span>
                <span class="font-semibold text-blue-600" aria-current="page">{{ $data['breadcrumb'] }}</span>
            </nav>
        @endif
        @if (! empty($data['eyebrow']))
            <p class="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{{ $data['eyebrow'] }}</p>
        @endif
        <h1 class="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#14284B] leading-[1.05]">
            {{ $data['headline'] ?? '' }}@if (! empty($data['headlineHighlight']))<span class="text-blue-600">{{ $data['headlineHighlight'] }}</span>@endif
        </h1>
        @if (! empty($data['subhead']))
            <p class="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl">{{ $data['subhead'] }}</p>
        @endif
        <span class="block mt-8 h-0.5 w-16 bg-blue-600" aria-hidden="true"></span>
    </div>
</section>
