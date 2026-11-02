<section class="py-16 text-center bg-slate-50">
    <div class="mx-auto max-w-3xl px-6">
        <x-icon name="sparkles" class="size-8 text-blue-600 mx-auto mb-4" />
        @foreach ($data['lines'] ?? [] as $line)
            <p class="text-2xl sm:text-3xl font-semibold text-slate-900">{{ $line }}</p>
        @endforeach
        @if (! empty($data['highlight']))<p class="text-blue-600 font-semibold mt-4">{{ $data['highlight'] }}</p>@endif
    </div>
</section>
