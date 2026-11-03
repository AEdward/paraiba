@php
    $catalog = [
        'python' => 'Python', 'javascript' => 'JavaScript', 'typescript' => 'TypeScript', 'php' => 'PHP',
        'dart' => 'Dart', 'openjdk' => 'Java', 'kotlin' => 'Kotlin', 'swift' => 'Swift', 'csharp' => 'C#',
        'cplusplus' => 'C++', 'html5' => 'HTML5', 'css3' => 'CSS3', 'react' => 'React', 'nextdotjs' => 'Next.js',
        'flutter' => 'Flutter', 'reactnative' => 'React Native', 'laravel' => 'Laravel', 'django' => 'Django',
        'fastapi' => 'FastAPI', 'nodedotjs' => 'Node.js', 'express' => 'Express.js', 'livewire' => 'Livewire',
        'alpinedotjs' => 'Alpine.js', 'tailwindcss' => 'Tailwind CSS', 'vuedotjs' => 'Vue.js', 'angular' => 'Angular',
        'mysql' => 'MySQL', 'postgresql' => 'PostgreSQL',
    ];
    $logoFor = ['reactnative' => 'react'];
    $byLabel = array_change_key_case(array_flip($catalog), CASE_LOWER);

    $entries = collect($data['keys'] ?? [])->map(function ($key) use ($catalog, $byLabel, $logoFor) {
        $raw = is_array($key) ? ($key['key'] ?? $key['label'] ?? '') : (string) $key;
        $slug = isset($catalog[strtolower($raw)]) ? strtolower($raw) : ($byLabel[strtolower($raw)] ?? null);
        $logo = $slug ? '/images/tech/'.($logoFor[$slug] ?? $slug).'.svg' : null;

        return [
            'label' => $slug ? $catalog[$slug] : $raw,
            'logo' => $logo && file_exists(public_path($logo)) ? $logo : null,
        ];
    })->filter(fn ($e) => $e['label'] !== '');
@endphp
<section class="py-12">
    <div class="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-20">
        @if (! empty($data['eyebrow']))<p class="text-sm font-semibold uppercase tracking-wide text-blue-600">{{ $data['eyebrow'] }}</p>@endif
        @if (! empty($data['heading']))<h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14284B]">{{ $data['heading'] }}</h2>@endif
        @if (! empty($data['body']))<p class="mt-2 text-lg text-slate-600">{{ $data['body'] }}</p>@endif

        <ul class="mt-10 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-x-6 gap-y-10">
            @foreach ($entries as $entry)
                <li class="flex flex-col items-center gap-3 text-center">
                    @if ($entry['logo'])
                        <img src="{{ $entry['logo'] }}" alt="" loading="lazy" decoding="async" width="48" height="48" class="size-12 object-contain">
                    @else
                        <span class="flex size-12 items-center justify-center rounded-lg bg-slate-100 text-lg font-bold text-slate-600">{{ mb_substr($entry['label'], 0, 1) }}</span>
                    @endif
                    <span class="text-base text-slate-800">{{ $entry['label'] }}</span>
                </li>
            @endforeach
        </ul>
    </div>
</section>
