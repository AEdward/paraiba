<section class="py-16">
    <div class="mx-auto max-w-5xl px-6 text-center">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase text-blue-600">{{ $data['eyebrow'] }}</p>@endif
        @if (! empty($data['heading']))<h2 class="text-2xl font-bold mt-2 mb-8">{{ $data['heading'] }}</h2>@endif
        <div class="flex flex-wrap justify-center gap-4">
            @foreach ($data['keys'] ?? [] as $key)
                <span class="rounded-full border border-slate-200 px-4 py-2 text-sm">{{ $key }}</span>
            @endforeach
        </div>
    </div>
</section>
