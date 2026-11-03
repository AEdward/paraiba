@php
    $paragraphs = collect(preg_split('/\R{2,}/', trim($data['body'] ?? '')))->filter();
    $imageLeft = ($data['imagePosition'] ?? 'right') === 'left';
@endphp
<section class="py-14">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="{{ $imageLeft ? 'lg:order-2' : '' }}">
            @if (! empty($data['eyebrow']))<p class="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">{{ $data['eyebrow'] }}</p>@endif
            @if (! empty($data['heading']))<h2 class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B] leading-tight">{{ $data['heading'] }}</h2>@endif
            <div class="mt-5 space-y-4 text-lg leading-relaxed text-slate-600">
                @foreach ($paragraphs as $paragraph)
                    <p>{{ $paragraph }}</p>
                @endforeach
            </div>
        </div>
        @if (! empty($data['image']))
            <div class="{{ $imageLeft ? 'lg:order-1' : '' }} overflow-hidden rounded-2xl aspect-[4/3] shadow-sm">
                <img src="{{ $data['image'] }}" alt="{{ $data['imageAlt'] ?? '' }}" loading="lazy" decoding="async" class="h-full w-full object-cover">
            </div>
        @endif
    </div>
</section>
