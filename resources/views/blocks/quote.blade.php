<section class="py-16 text-center">
    <div class="mx-auto max-w-3xl px-6">
        @foreach ($data['lines'] ?? [] as $line)
            <p class="text-2xl font-semibold">{{ $line }}</p>
        @endforeach
        @if (! empty($data['highlight']))<p class="text-blue-600 font-bold mt-2">{{ $data['highlight'] }}</p>@endif
    </div>
</section>
