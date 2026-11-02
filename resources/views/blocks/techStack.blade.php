<section class="py-16 text-center">
    <div class="mx-auto max-w-3xl px-6">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>@endif
        @if (! empty($data['heading']))<h2 class="text-2xl sm:text-3xl font-bold mt-2 mb-8">{{ $data['heading'] }}</h2>@endif
        <div class="flex flex-wrap justify-center gap-3">
            @foreach ($data['keys'] ?? [] as $key)
                <span class="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">{{ $key }}</span>
            @endforeach
        </div>
    </div>
</section>
